import { useRouter } from 'next/router'

export default function UserSelector() {
  const router = useRouter()
  const users = ['julia', 'rafael']

  return (
    <div className="flex gap-4 mb-6">
      {users.map(u => (
        <button
          key={u}
          onClick={() => router.push(`/${u}`)}
          className="px-4 py-2 rounded-2xl shadow hover:shadow-md capitalize bg-white"
        >
          {u}
        </button>
      ))}
    </div>
  )
}
