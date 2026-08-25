import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/domain/auth/register/schema/register-schema';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi input dengan zod schema
    const validatedData = registerSchema.parse(body);
    const { email, password, username } = validatedData;

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        created_at: new Date(),
        exp: 0,
      },
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
      }
    });

    return NextResponse.json(
      {
        message: 'Registrasi berhasil',
        user
      },
      { status: 201 }
    );

  } catch (error) {
    // Handle validation error dari zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Data tidak valid', errors: error },
        { status: 400 }
      );
    }

    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
