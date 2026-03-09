import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import VillageAssignmentList, { fetchAssignments } from "./VillageList";
import AssignVillageDialog from "./AssignVillageDailog";
import { Input } from "../ui/input";

const VillageAssignmentTab = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments(setAssignments, setLoading);
  }, []);

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-2xl font-semibold text-foreground">Village Assignment</h2>
          <p className="text-sm text-muted-foreground">Assign users to project Village</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search by User, Village Code..."
            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-72"
          />
          <Button onClick={() => setIsAssignDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Assign Village
          </Button>
        </div>
      </div>

      <VillageAssignmentList
       searchQuery={searchQuery}
       assignments={assignments}
       loading={loading}
        setAssignments={setAssignments}   />
      {/* <AssignPageDialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} /> */}
      <AssignVillageDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        // onSuccess={(newAssignments) =>
        //   setAssignments(prev => [...newAssignments, ...prev])
        // }
        onSuccess={() => fetchAssignments(setAssignments, setLoading)}
      />
    </div>
  );
};

export default VillageAssignmentTab;
