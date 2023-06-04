import { NextResponse } from "next/server";

export default async function POST(request: Request) {
	console.log(request);
	return NextResponse.json(request.body);
}
