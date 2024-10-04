import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// POST handler
export async function POST(req: Request) {
  const { title, date } = await req.json(); // Parse JSON body from the request

  try {
    const result = await sql`
      INSERT INTO your_table_name (title, date) 
      VALUES (${title}, ${date}) 
      RETURNING *
    `;
    return NextResponse.json(result, { status: 201 }); // Return the inserted data
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error saving data to the database" }, { status: 500 });
  }
}
