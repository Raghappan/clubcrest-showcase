import { useState, useEffect } from "react";

export default function Admin() {
  const [operators, setOperators] = useState<any[]>([]);
  const [operations, setOperations] = useState<any[]>([]);
  const [newOperator, setNewOperator] = useState({ handle: "", name: "", rank: "", cell: "", region: "", specialty: "", joined: "" });
  const [newOperation, setNewOperation] = useState({ code: "", name: "", cell: "", status: "ACTIVE", desc: "", week: "" });

  useEffect(() => {
    fetch('/api/operators').then(r => r.json()).then(setOperators)
    fetch('/api/operations').then(r => r.json()).then(setOperations)
  }, [])

  const addOperator = async () => {
    await fetch('/api/operators', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newOperator) })
    fetch('/api/operators').then(r => r.json()).then(setOperators)
    setNewOperator({ handle: "", name: "", rank: "", cell: "", region: "", specialty: "", joined: "" })
  }

  const deleteOperator = async (id: string) => {
    await fetch(`/api/operators?id=${id}`, { method: 'DELETE' })
    setOperators(operators.filter(o => o._id !== id))
  }

  const addOperation = async () => {
    await fetch('/api/operations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newOperation, week: Number(newOperation.week) }) })
    fetch('/api/operations').then(r => r.json()).then(setOperations)
    setNewOperation({ code: "", name: "", cell: "", status: "ACTIVE", desc: "", week: "" })
  }

  const deleteOperation = async (id: string) => {
    await fetch(`/api/operations?id=${id}`, { method: 'DELETE' })
    setOperations(operations.filter(o => o._id !== id))
  }

  const input = "w-full bg-black border border-zinc-700 text-white p-2 text-sm mono mb-2"
  const btn = "px-4 py-2 mono text-xs tracking-widest uppercase"

  return (
    <div className="min-h-screen bg-black text-white p-8 mono">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Admin Panel</h1>
      <p className="text-zinc-500 text-xs tracking-widest uppercase mb-12">Codex Syndicate · Internal</p>

      {/* OPERATORS */}
      <div className="mb-16">
        <h2 className="text-xl font-bold uppercase tracking-tight mb-6 border-b border-zinc-800 pb-3">Operators</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          {['handle','name','rank','cell','region','specialty','joined'].map(field => (
            <input key={field} placeholder={field} value={(newOperator as any)[field]}
              onChange={e => setNewOperator({...newOperator, [field]: e.target.value})}
              className={input} />
          ))}
        </div>
        <button onClick={addOperator} className={`${btn} bg-white text-black mb-8`}>+ Add Operator</button>

        <table className="w-full text-xs border border-zinc-800">
          <thead><tr className="border-b border-zinc-800 text-zinc-500">
            <th className="p-2 text-left">Handle</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Cell</th>
            <th className="p-2 text-left">Region</th>
            <th className="p-2 text-left">Specialty</th>
            <th className="p-2 text-left">Joined</th>
            <th className="p-2"></th>
          </tr></thead>
          <tbody>{operators.map(o => (
            <tr key={o._id} className="border-b border-zinc-800 hover:bg-zinc-900">
              <td className="p-2">{o.handle}</td>
              <td className="p-2">{o.name}</td>
              <td className="p-2">{o.rank}</td>
              <td className="p-2">{o.cell}</td>
              <td className="p-2">{o.region}</td>
              <td className="p-2">{o.specialty}</td>
              <td className="p-2">{o.joined}</td>
              <td className="p-2"><button onClick={() => deleteOperator(o._id)} className="text-red-500 hover:text-red-400">✕</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* OPERATIONS */}
      <div>
        <h2 className="text-xl font-bold uppercase tracking-tight mb-6 border-b border-zinc-800 pb-3">Operations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          {['code','name','cell','status','desc','week'].map(field => (
            <input key={field} placeholder={field} value={(newOperation as any)[field]}
              onChange={e => setNewOperation({...newOperation, [field]: e.target.value})}
              className={input} />
          ))}
        </div>
        <button onClick={addOperation} className={`${btn} bg-white text-black mb-8`}>+ Add Operation</button>

        <table className="w-full text-xs border border-zinc-800">
          <thead><tr className="border-b border-zinc-800 text-zinc-500">
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Cell</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Desc</th>
            <th className="p-2 text-left">Week</th>
            <th className="p-2"></th>
          </tr></thead>
          <tbody>{operations.map(o => (
            <tr key={o._id} className="border-b border-zinc-800 hover:bg-zinc-900">
              <td className="p-2">{o.code}</td>
              <td className="p-2">{o.name}</td>
              <td className="p-2">{o.cell}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2">{o.desc}</td>
              <td className="p-2">{o.week}</td>
              <td className="p-2"><button onClick={() => deleteOperation(o._id)} className="text-red-500 hover:text-red-400">✕</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}