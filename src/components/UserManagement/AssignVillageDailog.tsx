import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SearchableDropdown from "../SearchableDropdown";
import { showToast } from '@/components/ui/show-toast';

// const VITE_BACKEND_URL1 = process.env.REACT_APP_BACKEND2;
let VITE_BACKEND_URL1 = import.meta.env.VITE_BACKEND_URL1;
let VITE_BACKEND_URL2 = import.meta.env.VITE_BACKEND_URL2;


const AssignVillageDialog = ({ open, onOpenChange, onSuccess }) => {
  const { toast } = useToast();

  const [districts, setDistricts] = useState<any[]>([]);
  const [subDistricts, setSubDistricts] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [districtId, setDistrictId] = useState("");
  const [subDistrictId, setSubDistrictId] = useState("");
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [villageLoading, setVillageLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [subDistrictLoading, setSubDistrictLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [districtSearch, setDistrictSearch] = useState("");
  const [subDistrictSearch, setSubDistrictSearch] = useState("");
  const token = JSON.parse(localStorage.getItem('user'))?.token || '';

  const [villagesState, setVillagesState] = useState<
    Record<string, { selected: boolean; village_name: string; village_lgd_code: string }>
  >({});
  console.log(localStorage.getItem('user'), "___user token___");
  /* ---------------- FETCH DISTRICTS ---------------- */
  useEffect(() => {
    if (!open) return;
    setDistrictLoading(true);
    const fetchDistricts = async () => {
      try {
        const res = await fetch(`${VITE_BACKEND_URL2}/districts`);
        if (!res.ok) throw new Error();
        let data = await res.json();
        // setDistricts(data.data);
        // setDistricts(data.data.map(d => ({
        //   id: d.district_lgd_code,
        //   name: d.district_name,
        //   lgdCode: d.district_lgd_code
        // })));
        setDistricts(
          data.data.map(d => ({
            id: d.district_lgd_code,
            name: `${d.district_name} (${d.district_lgd_code})`, // 👈 IMPORTANT
            actualName: d.district_name,                          // optional
            lgdCode: d.district_lgd_code                           // optional
          }))
        );

      } catch {
        // toast({ variant: "destructive", title: "Failed to fetch districts" });
        showToast(500, "Failed to fetch district data.");
      } finally {
        setDistrictLoading(false);
      }
    };

    fetchDistricts();
  }, [open]);

  /* ---------------- FETCH SUB-DISTRICTS ---------------- */
  useEffect(() => {
    if (!districtId) return;
    setSubDistrictLoading(true);
    const fetchSubDistricts = async () => {
      try {
        const res = await fetch(`${VITE_BACKEND_URL2}/subdistricts/${districtId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        // setSubDistricts(data.data);
        // setSubDistricts(data.data.map(s => ({
        //   id: s.sub_district_lgd_code,
        //   name: s.sub_district_name,
        //   lgdCode: s.sub_district_lgd_code
        // })));
        setSubDistricts(
          data.data.map(sd => ({
            id: sd.sub_district_lgd_code,
            name: `${sd.sub_district_name} (${sd.sub_district_lgd_code})`,
            actualName: sd.sub_district_name,
            lgdCode: sd.sub_district_lgd_code
          }))
        );

      } catch {
        // toast({
        //   variant: "destructive",
        //   title: "Failed to fetch sub-districts",
        // });
        showToast(500, "Failed to fetch sub-district data.");
      } finally {
        setSubDistrictLoading(false);
      }
    };

    // RESET EVERYTHING ON DISTRICT CHANGE
    setSubDistrictId("");
    setUserId("");
    setVillages([]);
    setVillagesState({});
    setUsers([]);
    setSearch("");

    fetchSubDistricts();
  }, [districtId]);

  /* ---------------- FETCH VILLAGES + USERS ---------------- */
  useEffect(() => {
    if (!subDistrictId) return;

    // RESET ON SUB-DISTRICT CHANGE

    setUserId("");
    const fetchVillagesAndUsers = async () => {
      try {
        setVillageLoading(true);
        setUserLoading(true);

        const villRes = await fetch(
          `${VITE_BACKEND_URL2}/villages/${subDistrictId}`
        );

        if (!villRes.ok) throw new Error("Village API failed");

        const villageData = await villRes.json();

        // ✅ villages should always load
        setVillages(
          villageData.data.map(v => ({
            id: v.village_lgd_code,
            name: `${v.village_name} (${v.village_lgd_code})`,
            lgdCode: v.village_lgd_code,
          }))
        );

        // build villagesState (see Fix 2 below)
        const state: any = {};
        villageData.data.forEach(v => {
          state[v.village_lgd_code] = {
            selected: false,
            village_name: v.village_name,
            village_lgd_code: v.village_lgd_code,
          };
        });
        setVillagesState(state);
        // 🔹 users are OPTIONAL
        try {
          const userRes = await fetch(
            `${VITE_BACKEND_URL1}/users/by-subdistrict/${subDistrictId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // if token required

            }
          }
          );

          if (userRes.ok) {
            const userData = await userRes.json();
            // setUsers(userData.data || []);
            setUsers(
              (userData.data || []).map((u: any) => ({
                id: u.id, // 👈 unique  id
                userId: u.userId, // 👈 user_id
                name: `${u.name} | ${u.mobile} | ${u.userid}`, // 👈 searchable string
                actualName: u.name,        // optional (future use)
                mobile: u.mobile,          // optional
              }))
            );

          } else {
            setUsers([]);
          }
        } catch {
          setUsers([]);
        }

      } catch (err) {
        // toast({
        //   variant: "destructive",
        //   title: "Failed to fetch villages",
        // });
        showToast(500, "Failed to fetch village data.");
      } finally {
        setVillageLoading(false);
        setUserLoading(false);
      }
    };
    setVillagesState({});
    setSearch("");

    fetchVillagesAndUsers();
  }, [subDistrictId]);

  const resetForm = () => {
    setDistrictId("");
    setSubDistrictId("");
    setUserId("");

    setDistrictSearch("");
    setSubDistrictSearch("");
    setSearch("");

    setSubDistricts([]);
    setVillages([]);
    setUsers([]);

    setVillagesState({});
    setVillageLoading(false);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);


  /* ---------------- FILTERED VILLAGES ---------------- */
  const filteredVillages = useMemo(() => {
    return Object.values(villagesState).filter(v =>
      `${v.village_name} ${v.village_lgd_code}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [villagesState, search]);

  const allFilteredSelected =
    filteredVillages.length > 0 &&
    filteredVillages.every(v => v.selected);

  const toggleSelectAllFiltered = (checked: boolean) => {
    setVillagesState(prev => {
      const updated = { ...prev };
      filteredVillages.forEach(v => {
        updated[v.village_lgd_code] = { ...v, selected: checked };
      });
      return updated;
    });
  };

  const isAnySelected = Object.values(villagesState).some(v => v.selected);

  /* ---------------- ASSIGN VITE_BACKEND_URL1 ---------------- */
  const handleAssign = async () => {
    if (assignLoading) return;
    setAssignLoading(true);
    const selectedVillageCodes = Object.values(villagesState)
      .filter(v => v.selected)
      .map(v => Number(v.village_lgd_code));

    if (!districtId || !subDistrictId || !userId) {
      // return toast({
      //   variant: "destructive",
      //   title: "Please select district, sub-district and user",
      // });
      return showToast(400, "Please select district, sub-district and user.");
    }

    if (selectedVillageCodes.length === 0) {
      // return toast({
      //   variant: "destructive",
      //   title: "Please select at least one village",
      // });
      return showToast(400, "Please select at least one village.");
    }
    console.log("ASSIGNING VILLAGES:", {
      district_lgd_code: districtId,
      sub_district_lgd_code: subDistrictId,
      village_lgd_codes: selectedVillageCodes,
      user_id: userId,
    });
    let payload = {
      district_lgd_code: districtId,
      sub_district_lgd_code: subDistrictId,
      village_lgd_codes: selectedVillageCodes,
      user_id: userId,
    };

    console.log("PAYLOAD:", payload);
    console.log("Token:", token);

    try {
      const res = await fetch(
        `${VITE_BACKEND_URL1}/village-assign/assign-multiple`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // if token required

          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      // toast({
      //   title: "Villages Assigned",
      //   description: `${selectedVillageCodes.length} villages assigned successfully`,
      // });
      showToast(200, `${selectedVillageCodes.length} villages assigned successfully.`);
      onSuccess();
      onOpenChange(false);
    } catch {
      // toast({
      //   variant: "destructive",
      //   title: "Failed to assign villages",
      // });
      showToast(500, "Failed to assign villages.");
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className="sm:max-w-[900px]"> */}
      <DialogContent className="sm:max-w-[900px] !rounded-xl mx-0 w-[calc(100%_-_1.0rem)]">

        <DialogHeader>
          <DialogTitle>Assign Village for Verification</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Select Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* District */}

            <div className="space-y-2">
              <Label>District (LGD Code)</Label>

              <SearchableDropdown
                id="district"
                options={districts}                 // ✅ CORRECT
                label="name"
                placeholder={districtLoading ? "Loading districts..." : "Search district"}
                selectedVal={
                  districts.find(d => d.id === districtId)?.name || ""
                }
                handleChange={(val) => {
                  const selected = districts.find(d => d.name === val);
                  setDistrictId(selected ? selected.id : "");

                  // 🔁 reset dependents
                  setSubDistrictId("");
                  setUserId("");
                  setVillagesState({});
                }}
              />
            </div>

            {/* Sub District */}

            <div className="space-y-2">
              <Label>Sub‑District (LGD Code)</Label>

              <SearchableDropdown
                id="subdistrict"
                options={subDistricts}
                label="name"                       // 👈 unchanged
                // placeholder="Search sub-district"
                placeholder={
                  subDistrictLoading
                    ? "Loading sub-districts..."
                    : "Search sub-district"
                }
                disabled={!districtId}
                selectedVal={
                  subDistricts.find(sd => sd.id === subDistrictId)?.name || ""
                }
                handleChange={(val) => {
                  const selected = subDistricts.find(sd => sd.name === val);
                  setSubDistrictId(selected ? selected.id : "");

                  // 🔁 reset dependent fields
                  setUserId("");
                  setVillagesState({});
                }}
              />
            </div>


            {/* User */}
            <div className="space-y-2">
              <Label>User (Name | Mobile | UserID)</Label>

              <SearchableDropdown
                id="user"
                options={users}
                label="name"
                // placeholder="Search user (name / mobile / ID)"
                placeholder={
                  userLoading
                    ? "Loading users..."
                    : "Search user (name / mobile / ID)"
                }
                disabled={!subDistrictId}
                selectedVal={
                  users.find(u => u.id === userId)?.name || ""
                }
                handleChange={(val) => {
                  const selected = users.find(u => u.name === val);
                  setUserId(selected ? selected.id : "");
                }}
              />
            </div>

          </div>

          {/* Villages */}
          {subDistrictId && (
            <div className="border rounded-md">
              <div className="p-3 border-b bg-muted/30 flex justify-end">
                <Input
                  className="w-64"
                  placeholder="Search village / LGD"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto">
                {/* <table className="w-full text-sm"> */}
                <table className="w-full text-sm table-fixed">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="p-2 w-12 text-center">
                        <Checkbox
                          checked={allFilteredSelected}
                          onCheckedChange={c =>
                            toggleSelectAllFiltered(!!c)
                          }
                        />
                      </th>
                      <th className="p-2 text-left">Village</th>
                      <th className="p-2 text-left">LGD Code</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {filteredVillages.map(v => (
                      <tr key={v.village_lgd_code} className="border-t">
                        <td className="p-2 text-center">
                          <Checkbox
                            checked={v.selected}
                            onCheckedChange={c =>
                              setVillagesState(prev => ({
                                ...prev,
                                [v.village_lgd_code]: {
                                  ...v,
                                  selected: !!c,
                                },
                              }))
                            }
                          />
                        </td>
                        <td className="p-2 w-[60%] truncate" title={v.village_name}>
                          {v.village_name}
                        </td>
                        <td className="p-2 w-[40%] whitespace-nowrap font-mono">
                          {v.village_lgd_code}
                        </td>


                      </tr>
                    ))}
                  </tbody> */}

                  <tbody>
                    {villageLoading ? (
                      [...Array(6)].map((_, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-2 text-center">
                            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                          </td>
                          <td className="p-2">
                            <div className="h-4 w-[80%] bg-muted animate-pulse rounded" />
                          </td>
                          <td className="p-2">
                            <div className="h-4 w-[60%] bg-muted animate-pulse rounded" />
                          </td>
                        </tr>
                      ))
                    ) : filteredVillages.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-muted-foreground">
                          No villages found
                        </td>
                      </tr>
                    ) : (
                      filteredVillages.map(v => (
                        <tr key={v.village_lgd_code} className="border-t">
                          <td className="p-2 text-center">
                            <Checkbox
                              disabled={villageLoading}
                              checked={v.selected}
                              onCheckedChange={c =>
                                setVillagesState(prev => ({
                                  ...prev,
                                  [v.village_lgd_code]: {
                                    ...v,
                                    selected: !!c,
                                  },
                                }))
                              }
                            />
                          </td>

                          <td className="p-2 w-[60%] truncate" title={v.village_name}>
                            {v.village_name}
                          </td>

                          <td className="p-2 w-[40%] whitespace-nowrap font-mono">
                            {v.village_lgd_code}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {/* <Button
            disabled={!isAnySelected || !userId || assignLoading}
            onClick={handleAssign}
          >
            Assign Village
          </Button> */}
          <Button
            disabled={
              !isAnySelected ||
              !userId ||
              villageLoading ||
              userLoading ||
              subDistrictLoading ||
              assignLoading
            }
            onClick={handleAssign}
          >
            {assignLoading ? "Assigning..." : "Assign Village"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignVillageDialog;
