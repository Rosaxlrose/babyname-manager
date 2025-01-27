import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './style.css';

const AdminAI = () => {
  const [wordPairs, setWordPairs] = useState([]);
  const [trainingData, setTrainingData] = useState([]);
  const [newWord, setNewWord] = useState({ word: '', meaning: '', category: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: words } = await supabase.from('word_meanings').select('*');
      const { data: training } = await supabase.from('training_data').select('*');
      setWordPairs(words || []);
      setTrainingData(training || []);
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ไม่สามารถโหลดข้อมูลได้');
    }
  };

  const handleAddWord = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('word_meanings').insert([newWord]);
      if (error) throw error;

      alert(`เพิ่มคำว่า "${newWord.word}" เรียบร้อยแล้ว`);
      setNewWord({ word: '', meaning: '', category: '' });
      fetchData();
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ไม่สามารถเพิ่มข้อมูลได้');
    }
  };

  const filteredWordPairs = wordPairs.filter(
    (pair) =>
      pair.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWordPairs.length / recordsPerPage);
  const displayedWordPairs = filteredWordPairs.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="ml-64 p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">จัดการข้อมูล AI</h1>

      <div className="grid gap-6">
        <div className="card">
          <h2 className="card-title">เพิ่มความสัมพันธ์ของคำ</h2>
          <form onSubmit={handleAddWord} className="space-y-4">
            <div className="form-group">
              <label className="label">คำ</label>
              <input
                className="input"
                value={newWord.word}
                onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">ความหมาย</label>
              <textarea
                className="textarea"
                value={newWord.meaning}
                onChange={(e) => setNewWord({ ...newWord, meaning: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">หมวดหมู่</label>
              <input
                className="input"
                value={newWord.category}
                onChange={(e) => setNewWord({ ...newWord, category: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="button bg-green-500 text-white hover:bg-green-600">
              เพิ่มข้อมูล
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="card-title">ข้อมูลที่มีอยู่</h2>
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
              placeholder="ค้นหาคำ ความหมาย หรือหมวดหมู่..."
            />
          </div>
          <div className="overflow-y-auto max-h-[300px] border rounded-md shadow-sm bg-white p-4">
            {displayedWordPairs.map((pair) => (
              <div key={pair.id} className="list-item border-b pb-2 mb-2">
                <p><strong>คำ:</strong> {pair.word}</p>
                <p><strong>ความหมาย:</strong> {pair.meaning}</p>
                <p><strong>หมวดหมู่:</strong> {pair.category}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="button bg-blue-500 text-white hover:bg-blue-600"
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>
            <p>หน้า {currentPage} / {totalPages}</p>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="button bg-blue-500 text-white hover:bg-blue-600"
              disabled={currentPage === totalPages}
            >
              ถัดไป
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">ข้อมูลการเทรน</h2>
          <div className="grid gap-4">
            {trainingData.map((data) => (
              <div key={data.id} className="list-item border rounded-md shadow p-4">
                <p><strong>Input:</strong> {data.input_text}</p>
                <p><strong>Output:</strong> {data.output_text}</p>
                <p><strong>ความแม่นยำ:</strong> {(data.confidence_score * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAI;
