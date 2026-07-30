import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type LoggedUser = {
  id: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
};

export async function getCurrentUser(): Promise<LoggedUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload & LoggedUser;

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}