export default function Home() {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{backgroundImage: 'url(/Hero section.png)'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div>
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Site</h1>
          <p className="text-xl mb-8">Discover amazing things</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
        </div>
      </div>
    </section>
  );
}
