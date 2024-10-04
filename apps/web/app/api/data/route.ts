import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET handler
export async function GET() {
  try {
    const result = await sql`SELECT * FROM your_table_name`;
    return NextResponse.json(result.rows); // Return the retrieved data
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error retrieving data from database" }, { status: 500 });
  }
}
