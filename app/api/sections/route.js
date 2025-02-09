import Section from "@/app/lib/model/SectionDB";
import { connectToDB } from "@/app/lib/DataBase";
import { NextResponse } from "next/server";

// CREATE a new section
export async function POST(req) {
  try {
    const { label } = await req.json();
    await connectToDB();
    
    const newSection = new Section({ label });
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

// UPDATE a section
export async function PUT(req) {
  try {
    const { oldLabel, newLabel } = await req.json();
    await connectToDB();

    const updatedSection = await Section.findOneAndUpdate(
      { label: oldLabel },  // Find section by old label
      { label: newLabel },  // Update with new label
      { new: true }         // Return updated document
    );

    if (!updatedSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Section updated", section: updatedSection }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update section", details: error.message }, { status: 500 });
  }
}


// DELETE a section
export async function DELETE(req) {
  try {
    await connectToDB();
    // Extract label from query parameters
    const { label } = await req.json();
    

    if (!label) {
      return NextResponse.json({ error: "Label is required" }, { status: 400 });
    }

    console.log(label);

    const deletedSection = await Section.findOneAndDelete({ 
       label 
     });

    if (!deletedSection) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Section deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete section", details: error.message }, { status: 500 });
  }
}
