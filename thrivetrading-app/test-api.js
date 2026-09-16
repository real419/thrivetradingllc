async function test() {
  // Pointing directly to your live Render backend
  const API_URL = 'https://thrivetradingllc.onrender.com'; 

  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      name: 'Test Client', 
      email: 'test2@example.com', // Changed email slightly so it doesn't conflict if test@example.com already exists
      password: '123456' 
    })
  });
  
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}

test();