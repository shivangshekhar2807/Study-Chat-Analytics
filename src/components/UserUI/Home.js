


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const dsaTopics = ['Arrays', 'Linked List', 'Stacks', 'Queues', 'Trees', 'Hashing', 'Recursion', 'Sorting', 'Searching'];
const jsTopics = ['Variables & Scope', 'Hoisting', 'Closures', 'Promises', 'Async/Await', 'Event Loop', 'Callback Functions', 'DOM Manipulation', 'Fetch API'];
const reactTopics = ['Components & Props', 'Hooks (useState, useEffect, etc.)', 'Context API', 'React Router', 'Redux Toolkit', 'useReducer', 'Forms & Validation', 'Lifecycle Methods','Authentication'];



function Home() {
  const [checkedItems, setCheckedItems] = useState({});
  const [progressData, setProgressData] = useState([
    { name: 'DSA', completed: 0 },
    { name: 'JavaScript', completed: 0 },
    { name: 'React', completed: 0 },
  ]);
    const email = useSelector((state) => state.Auth.email);
    const cleanEmail = email.replace(/[@.]/g, '_');
    
    const firebaseURL = `https://movies-e-commerce-default-rtdb.firebaseio.com/${cleanEmail}.json`;

  // 📥 Fetch saved data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(firebaseURL);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCheckedItems(data || {}); // fallback to empty object if null
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  
    
    useEffect(() => {
  const dsaCompleted = dsaTopics.filter((_, i) => {
    const el = document.getElementById(`dsa-${i}`);
    return el && el.checked;
  }).length;

  const jsCompleted = jsTopics.filter((_, i) => {
    const el = document.getElementById(`js-${i}`);
    return el && el.checked;
  }).length;

  const reactCompleted = reactTopics.filter((_, i) => {
    const el = document.getElementById(`react-${i}`);
    return el && el.checked;
  }).length;

  setProgressData([
    { name: 'DSA', completed: (dsaCompleted / dsaTopics.length) * 100 },
    { name: 'JavaScript', completed: (jsCompleted / jsTopics.length) * 100 },
    { name: 'React', completed: (reactCompleted / reactTopics.length) * 100 },
  ]);
}, [checkedItems]);

  // 📝 Handle checkbox toggle and save to Firebase
  const handleCheckboxChange = async (e) => {
    const { id, checked } = e.target;
    const updated = { ...checkedItems, [id]: checked };
    setCheckedItems(updated);

    try {
      await fetch(firebaseURL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error('Failed to update Firebase:', err);
    }
  };

  // 📋 Render helper
  const renderCheckboxes = (topics, prefix) =>
    topics.map((topic, index) => {
        const id = `${prefix}-${index}`;
        
      return (
        <div className="form-check" key={id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={id}
            checked={checkedItems[id] || false}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={id}>
            {topic}
          </label>
        </div>
      );
    });

  return (
    <div className="container py-5 text-light">
      <h2 className="text-center mb-5" style={{ color: '#f0e6d2' }}>📚 Track Your Progress</h2>

      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card bg-secondary text-white shadow p-3" style={{ borderRadius: '12px' }}>
            <h4 className="text-warning">DSA</h4>
            {renderCheckboxes(dsaTopics, 'dsa')}
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-secondary text-white shadow p-3" style={{ borderRadius: '12px' }}>
            <h4 className="text-warning">JavaScript</h4>
            {renderCheckboxes(jsTopics, 'js')}
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card bg-secondary text-white shadow p-3" style={{ borderRadius: '12px' }}>
            <h4 className="text-warning">React</h4>
            {renderCheckboxes(reactTopics, 'react')}
          </div>
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-success mb-4">📊 Analytics</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#f0e6d2" />
            <YAxis stroke="#f0e6d2" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#c19a6b" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Home;