export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-10 px-20 flex justify-between">
      <div>
        <h3 className="text-blue-600 text-2xl font-bold">Quick Links</h3>
        <ul className="mt-4 space-y-2 text-lg">
          <li>Home</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div>
        <h3 className="text-blue-600 text-2xl font-bold">Contact</h3>
        <ul className="mt-4 space-y-2 text-lg">
          <li>📧 info@careerboost.com</li>
          <li>☎ +91 9823456791</li>
          <li>📍 Mumbai, India</li>
        </ul>
      </div>
    </footer>
  );
}
