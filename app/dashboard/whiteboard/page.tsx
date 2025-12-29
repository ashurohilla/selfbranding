import { createSupabaseServerClient } from "@/lib/supabase";
import Whiteboard from "./components/whiteboard";
import { saveDiagramAction } from "@/lib/actions/blog";


interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function WhiteboardPage({ searchParams }: PageProps) {
  const id = searchParams.id as string;
  let initialData = null;
  let initialTitle = "";

  // If an ID exists in the URL, fetch the data from the DB to populate the board
  if (id) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("diagrams")
      .select("name, scene_data")
      .eq("id", id)
      .single();

    if (data) {
      initialTitle = data.name;
      // Depending on how you stored it, you might need to structure it for Excalidraw
      initialData = {
        elements: data.scene_data.elements,
        appState: data.scene_data.appState
      };
    }
  }

  // Pass the Server Action (saveDiagramAction) directly as a prop
  return (
    <Whiteboard 
      id={id}
      initialData={initialData}
      initialTitle={initialTitle}
      onSave={saveDiagramAction} 
    />
  );
}