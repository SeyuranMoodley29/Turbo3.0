import Link from "next/link";

export default function SecondPage() {
    return (
      <div>
        <h1>This is the Second Page</h1>
        <p>Please don't judge me.</p>
        
        {/* Button to navigate to another page */}
        <Link href="/">
        <button style={{ border: '2px solid #007BFF', padding: '10px 20px', borderRadius: '5px' }}>
            Go to Another Page
          </button>
        </Link>
      </div>
    );
}
