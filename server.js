import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

// 初始化数据库
const db = new sqlite3.Database('./waiting_list.db');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS waiting_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// 提交 email 接口
app.post('/api/waiting-list', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: '邮箱不能为空' });
  }
  db.run(
    `INSERT INTO waiting_list (email) VALUES (?)`,
    [email],
    function (err) {
      if (err) {
        return res.status(500).json({ error: '数据库错误' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// 获取所有等待用户接口
app.get('/api/waiting-list', (req, res) => {
  db.all(`SELECT * FROM waiting_list ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: '数据库错误' });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});