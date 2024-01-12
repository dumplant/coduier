"use client";
import { useState } from "react";
import { Home, User, Select } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function DormSelectionForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [batch, setBatch] = useState("2023");
  const [roomType, setRoomType] = useState("single");
  const [preferences, setPreferences] = useState("");
  const [agree, setAgree] = useState(false);
  const handleSubmit = () => {
    // TODO: Handle form submission
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Gender</Label>
            <div className="flex space-x-2">
              <RadioGroup value={gender} onChange={(e) => setGender()}>
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </RadioGroup>
            </div>
          </div>
          <div>
            <Label>Batch</Label>
            <UISelect>
              <SelectTrigger>
                <SelectValue>{batch}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </UISelect>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Room Preference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Room Type</Label>
            <UISelect>
              <SelectTrigger>
                <SelectValue>{roomType}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
              </SelectContent>
            </UISelect>
          </div>
          <div>
            <Label htmlFor="preferences">Roommate Preferences</Label>
            <Textarea
              id="preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.value)}
            />
            <Label>I agree to the terms and conditions</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="default">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
