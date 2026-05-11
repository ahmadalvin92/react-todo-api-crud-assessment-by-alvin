import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { koneksiDatabase } from './database.js';

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT || 3001);

app.use(cors());
app.use(express.json());

function ubahTodoDariDatabase(todo) {
  return {
    id: todo.id,
    judul: todo.judul,
    catatan: todo.catatan,
    status: todo.status,
    tanggal_dibuat: todo.tanggal_dibuat,
    tanggal_diubah: todo.tanggal_diubah,
  };
}

app.get('/api/todo', async (request, response) => {
  try {
    const [rows] = await koneksiDatabase.query(
      'SELECT id, judul, catatan, status, tanggal_dibuat, tanggal_diubah FROM daftar_todo ORDER BY id DESC',
    );

    response.json({ data: rows.map(ubahTodoDariDatabase) });
  } catch {
    response.status(500).json({ pesan: 'Data todo belum bisa dibuka.' });
  }
});

app.post('/api/todo', async (request, response) => {
  try {
    const { judul, catatan, status = 'belum_selesai' } = request.body;

    if (!judul?.trim() || !catatan?.trim()) {
      return response.status(422).json({ pesan: 'Judul dan catatan perlu diisi.' });
    }

    const [result] = await koneksiDatabase.execute(
      'INSERT INTO daftar_todo (judul, catatan, status) VALUES (?, ?, ?)',
      [judul.trim(), catatan.trim(), status],
    );

    const [rows] = await koneksiDatabase.execute(
      'SELECT id, judul, catatan, status, tanggal_dibuat, tanggal_diubah FROM daftar_todo WHERE id = ?',
      [result.insertId],
    );

    return response.status(201).json({ data: ubahTodoDariDatabase(rows[0]) });
  } catch {
    return response.status(500).json({ pesan: 'Todo belum bisa ditambahkan.' });
  }
});

app.put('/api/todo/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { judul, catatan, status } = request.body;

    if (!judul?.trim() || !catatan?.trim()) {
      return response.status(422).json({ pesan: 'Judul dan catatan perlu diisi.' });
    }

    await koneksiDatabase.execute(
      'UPDATE daftar_todo SET judul = ?, catatan = ?, status = ? WHERE id = ?',
      [judul.trim(), catatan.trim(), status, id],
    );

    const [rows] = await koneksiDatabase.execute(
      'SELECT id, judul, catatan, status, tanggal_dibuat, tanggal_diubah FROM daftar_todo WHERE id = ?',
      [id],
    );

    if (!rows.length) {
      return response.status(404).json({ pesan: 'Todo tidak ditemukan.' });
    }

    return response.json({ data: ubahTodoDariDatabase(rows[0]) });
  } catch {
    return response.status(500).json({ pesan: 'Todo belum bisa diperbarui.' });
  }
});

app.delete('/api/todo/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await koneksiDatabase.execute('DELETE FROM daftar_todo WHERE id = ?', [id]);

    return response.json({ pesan: 'Todo sudah dihapus.' });
  } catch {
    return response.status(500).json({ pesan: 'Todo belum bisa dihapus.' });
  }
});

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Backend Todo jalan di http://127.0.0.1:${port}`);
});

server.keepAliveTimeout = 65000;
