import Section from "@/app/lib/model/SectionDB";
import { connectToDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

// CREATE a new section
export async function POST(req) {
  try {
    const { name } = await req.json();
    await connectToDB();
    
    const newSection = new Section({ name });
    await newSection.save();

    return NextResponse.json({ message: "Section saved", section: newSection }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save section", details: error.message }, { status: 500 });
  }
}

// GET all sections
export async function GET() {
  try {
    await connectToDB();
    const sections = await Section.find({});
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sections", details: error.message }, { status: 500 });
  }
}

// DELETE a section
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectToDB();
    
    const deletedSection = await Section.findByIdAndDelete(id);
    if (!deletedSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Section deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete section", details: error.message }, { status: 500 });
  }
}
