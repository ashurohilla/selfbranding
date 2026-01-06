import { createSupabaseServerClient } from "@/lib/supabase";
import WhiteboardDashboard from "./components/WhiteboardDashboard";
import Whiteboard from "./whiteboard";
import { saveDiagramAction } from "@/lib/actions/blog";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WhiteboardPage({ searchParams }: PageProps) {
  // ✅ Correctly await searchParams for Next.js 15+ stability
  const params = await searchParams;
  const id = params.id as string;
  const isNewMode = params.mode === "new";

  const supabase = await createSupabaseServerClient();

  // CASE 1: Editing an existing diagram or creating a new one
  if (id || isNewMode) {
    let initialData = null;
    let initialTitle = "";

    if (id) {
      const { data, error } = await supabase
        .from("diagrams")
        .select("name, scene_data")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching diagram:", error.message);
      }

      if (data) {
        initialTitle = data.name;
        // Reconstruct the Excalidraw-specific scene structure
        initialData = {
          elements: data.scene_data?.elements || [],
          appState: data.scene_data?.appState || {},
        };
      }
    }

    return (
      <Whiteboard 
        id={id}
        initialData={initialData}
        initialTitle={initialTitle}
        onSave={saveDiagramAction} 
      />
    );
  }

  // CASE 2: Dashboard Mode (List all saved diagrams)
  const { data: diagrams, error: fetchError } = await supabase
    .from("diagrams")
    .select("id, name, created_at")
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Error fetching dashboard data:", fetchError.message);
  }

  return <WhiteboardDashboard diagrams={diagrams || []} />;
}