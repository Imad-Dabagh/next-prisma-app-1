export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Update user
// export async function PUT(req: NextRequest, context: { params: { id: string } }) {

//   console.log('Context params:', context.params);

//   const { id } = context.params;
//   const userId = parseInt(id);
//   const data = await req.json();

//   const updatedUser = await prisma.user.update({
//     where: { id: userId },
//     data,
//   });

//   return NextResponse.json({ message: 'User Updated Successfully', data: updatedUser });
// }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  const data = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return NextResponse.json({ message: 'User Updated Successfully', data: updatedUser });
}

// Delete user
export async function DELETE(_req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const userId = parseInt(id);

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({ message: 'User Deleted Successfully', data: deletedUser });
}