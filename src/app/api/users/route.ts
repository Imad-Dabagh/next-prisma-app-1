import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Get all users
export async function GET() {
  // console.log("Hello get all users");
  const users = await prisma.user.findMany();  

  if (users.length === 0) {
    return NextResponse.json({ message: "No users found", data: [] });
  }
  
  return NextResponse.json({ message: "Users fetched successfully", data: users });
}


// Create User
export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, pending, passed, redo, profilePicture } = body;

  const newUser = await prisma.user.create({
    data: { firstName, lastName, pending, passed, redo, profilePicture },
  });

  return NextResponse.json({ message: 'User Created Successfully', data: newUser });
}