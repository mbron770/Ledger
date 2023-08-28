import NavBar from "../components/shared/topbarnav";

function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow p-0">
        {children}
      </main>
    </div>
  );
}

export default Layout;