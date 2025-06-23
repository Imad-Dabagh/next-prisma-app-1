export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Correct context typing: context: { params: { id: string } }
interface RouteContext {
  params: {
    id: string;
  };
}

// Update user
export async function PUT(req: NextRequest, context: RouteContext) {
  const _params = await context.params
  const userId = parseInt(_params.id);
  const data = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return NextResponse.json({
    message: 'User Updated Successfully',
    data: updatedUser,
  });
}

// Delete user
export async function DELETE(_req: NextRequest, context: RouteContext) {
  const _params = await context.params
  const userId = parseInt(_params.id);

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({
    message: 'User Deleted Successfully',
    data: deletedUser,
  });
}



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