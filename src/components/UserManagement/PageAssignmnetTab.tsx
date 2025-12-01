import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageAssignmentList from "./PageAssignmentDailog";
import AssignPageDialog from "./AssignPageDailog";

const PageAssignmentTab = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Page Assignment</h2>
          <p className="text-sm text-muted-foreground">Assign users to project page</p>
        </div>
        <Button onClick={() => setIsAssignDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Assign Page
        </Button>
      </div>

      <PageAssignmentList />
      <AssignPageDialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} />
    </div>
  );
};

export default PageAssignmentTab;
