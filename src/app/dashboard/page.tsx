import { Logout } from "./_components/logout";



export default async function Dashboard() {

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
      <div className="flex items-center gap-2 mb-4">
        <Logout />
        Logout
      </div>
 
    </div>
  );
}