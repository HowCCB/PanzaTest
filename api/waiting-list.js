import { createClient } from '@supabase/supabase-js';

// 请确保下方填写你自己的 Supabase 项目 URL 和 anon 公钥
const supabaseUrl = 'https://ufuodqokhbcjihqcejzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdW9kcW9raGJjamlocWNlanpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTkyODEsImV4cCI6MjA2Njg3NTI4MX0.iXhXpryzYnkYThsSGvq9UHr5BIUz8Udic48Q9mwY1bU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // 兼容 Next.js/Vercel 的 API 路由
  if (req.method === 'POST') {
    let email = req.body?.email;
    // 兼容 application/json 和 x-www-form-urlencoded
    if (!email && typeof req.body === 'string') {
      try {
        const body = JSON.parse(req.body);
        email = body.email;
      } catch {}
    }
    if (!email) {
      return res.status(400).json({ error: '邮箱不能为空' });
    }
    const { data, error } = await supabase
      .from('waiting_list')
      .insert([{ email }]);
    if (error) {
      return res.status(500).json({ error: error.message || '数据库错误' });
    }
    return res.status(200).json({ success: true, data });
  } else if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('waiting_list')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message || '数据库错误' });
    }
    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
