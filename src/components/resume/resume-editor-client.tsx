'use client';

import { ResumePreview } from "@/components/resume/resume-preview";
import { updateResume } from "@/utils/actions";
import { deleteResume } from "@/utils/supabase/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WorkExperienceForm } from "@/components/resume/work-experience-form";
import { Resume } from "@/lib/types";
import { useState } from "react";
import { EducationForm } from "./education-form";
import { SkillsForm } from "./skills-form";
import { ProjectsForm } from "./projects-form";
import { CertificationsForm } from "./certifications-form";
import { Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";

export function ResumeEditorClient({
  initialResume,
}: {
  initialResume: Resume;
}) {
  const [resume, setResume] = useState(initialResume);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const updateField = (field: keyof Resume, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateResume(resume.id, resume);
      toast({
        title: "Success",
        description: "Resume saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteResume(resume.id);
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
      router.push('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="p-6 md:p-8 lg:p-10">
      <div className="max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Resume Editor
            </h1>
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button 
                onClick={handleDelete} 
                disabled={isDeleting}
                variant="destructive"
                className="bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all duration-300"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          {/* Editor Column */}
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6 pr-4">
              {/* Basic Information Card */}
              <Card className="bg-white/40 backdrop-blur-md border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input 
                        id="first_name" 
                        value={resume.first_name || ''} 
                        onChange={(e) => updateField('first_name', e.target.value)}
                        className="bg-white/50 border-white/40 focus:border-teal-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input 
                        id="last_name" 
                        value={resume.last_name || ''} 
                        onChange={(e) => updateField('last_name', e.target.value)}
                        className="bg-white/50 border-white/40 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={resume.email || ''} 
                      onChange={(e) => updateField('email', e.target.value)}
                      className="bg-white/50 border-white/40 focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={resume.phone_number || ''} 
                      onChange={(e) => updateField('phone_number', e.target.value)}
                      className="bg-white/50 border-white/40 focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={resume.location || ''} 
                      onChange={(e) => updateField('location', e.target.value)}
                      className="bg-white/50 border-white/40 focus:border-teal-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Online Presence Card */}
              <Card className="bg-white/40 backdrop-blur-md border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Online Presence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      value={resume.website || ''} 
                      onChange={(e) => updateField('website', e.target.value)}
                      className="bg-white/50 border-white/40 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input 
                      id="linkedin" 
                      value={resume.linkedin_url || ''} 
                      onChange={(e) => updateField('linkedin_url', e.target.value)}
                      className="bg-white/50 border-white/40 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input 
                      id="github" 
                      value={resume.github_url || ''} 
                      onChange={(e) => updateField('github_url', e.target.value)}
                      className="bg-white/50 border-white/40 focus:border-purple-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary Card */}
              <Card className="bg-white/40 backdrop-blur-md border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Professional Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    className="min-h-[150px] bg-white/50 border-white/40 focus:border-pink-500"
                    value={resume.professional_summary || ''}
                    onChange={(e) => updateField('professional_summary', e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Work Experience Section */}
              <WorkExperienceForm
                experiences={resume.work_experience}
                onChange={(experiences) => updateField('work_experience', experiences)}
              />

              {/* Education Section */}
              <EducationForm
                education={resume.education}
                onChange={(education) => updateField('education', education)}
              />

              {/* Skills Section */}
              <SkillsForm
                skills={resume.skills}
                onChange={(skills) => updateField('skills', skills)}
              />

              {/* Projects Section */}
              <ProjectsForm
                projects={resume.projects}
                onChange={(projects) => updateField('projects', projects)}
              />

              {/* Certifications Section */}
              <CertificationsForm
                certifications={resume.certifications}
                onChange={(certifications) => updateField('certifications', certifications)}
              />
            </div>
          </ScrollArea>

          {/* Preview Column */}
          <div className="h-[calc(100vh-200px)] overflow-hidden">
            <Card className="h-full bg-white/40 backdrop-blur-md border-white/40 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-4rem)]">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <ResumePreview resume={resume} />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 