import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>This is a basic React home page with some styling.</p>
      </header>
      <main className="home-main">
        <section className="home-content">
          <h2>About</h2>
          <p>This app demonstrates routing with React Router.</p>
        </section>
      </main>
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} My React App</p>
      </footer>
    </div>
  );
}

export default Home;
