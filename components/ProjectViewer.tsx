import React, { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronDown, ChevronUp, Code, Eye, Info } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ProjectViewerProps {
  project: any;
  onSelectElement: (element: string, description: string) => void;
}

export function ProjectViewer({ project, onSelectElement }: ProjectViewerProps) {
  const [selectedSection, setSelectedSection] = useState(project.sections[0].id);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{title: string, code: string, language: string} | null>(null);
  
  const currentSection = project.sections.find((section: any) => section.id === selectedSection);

  const handleSelectElement = (elementId: string, description: string) => {
    onSelectElement(elementId, description);
  };

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  const handleShowCode = (title: string, code: string, language: string) => {
    setDialogContent({
      title,
      code,
      language
    });
    setShowDialog(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">{project.name} - {project.tagline}</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="w-1/3 border-r">
          <div className="p-4">
            <h3 className="mb-3">Project Overview</h3>
            <Card className="p-4 mb-4">
              <div className="space-y-2">
                <p><strong>Challenge:</strong> {project.challenge}</p>
                <p><strong>Duration:</strong> {project.duration}</p>
                <p><strong>Role:</strong> {project.role}</p>
                <p><strong>Team:</strong> {project.team}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tools.map((tool: string) => (
                    <Badge key={tool} variant="secondary">{tool}</Badge>
                  ))}
                </div>
              </div>
            </Card>

            <h3 className="mb-2">Project Sections</h3>
            <div className="space-y-2">
              {project.sections.map((section: any) => (
                <Card 
                  key={section.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedSection === section.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4>{section.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(section.id);
                      }}
                    >
                      {expandedSection === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>
                  
                  {expandedSection === section.id && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>{section.description}</p>
                      
                      {section.insights && (
                        <div className="mt-2">
                          <strong>Key Insights:</strong>
                          <ul className="list-disc list-inside">
                            {section.insights.slice(0, 2).map((insight: string, index: number) => (
                              <li key={index}>{insight}</li>
                            ))}
                            {section.insights.length > 2 && <li>...</li>}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="preview" className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="preview" className="flex items-center gap-1">
                  <Eye size={14} />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-1">
                  <Code size={14} />
                  Code
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-1">
                  <Info size={14} />
                  Details
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="flex-1 p-4 overflow-auto">
              <ScrollArea className="h-full">
                <div className="space-y-6 max-w-3xl mx-auto">
                  <h2 className="text-xl font-medium">{currentSection.title}</h2>
                  <p>{currentSection.description}</p>

                  {currentSection.artifacts && currentSection.artifacts.map((artifact: any, index: number) => (
                    <div 
                      key={index} 
                      className="relative group"
                      onClick={() => handleSelectElement(
                        `${currentSection.id}-artifact-${index}`,
                        artifact.caption || currentSection.description
                      )}
                    >
                      <div className="rounded-lg overflow-hidden border cursor-pointer">
                        <ImageWithFallback
                          src={artifact.url}
                          alt={artifact.alt}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      {artifact.caption && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {artifact.caption}
                        </p>
                      )}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Badge className="bg-background/80 hover:bg-background/90 text-foreground">
                          Click to explore
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {currentSection.colorPalette && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Color Palette</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {currentSection.colorPalette.map((color: any, index: number) => (
                          <div 
                            key={index} 
                            className="p-3 border rounded-md cursor-pointer"
                            onClick={() => handleSelectElement(
                              `color-${color.name.toLowerCase().replace(' ', '-')}`,
                              `${color.name} (${color.hex}): ${color.usage}`
                            )}
                          >
                            <div 
                              className="h-12 rounded-md mb-2" 
                              style={{ backgroundColor: color.hex }}
                            ></div>
                            <div>
                              <p className="font-medium">{color.name}</p>
                              <p className="text-xs text-muted-foreground">{color.hex}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentSection.screens && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">App Screens</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentSection.screens.map((screen: any, index: number) => (
                          <div 
                            key={index} 
                            className="border rounded-lg p-3 cursor-pointer"
                            onClick={() => handleSelectElement(
                              `screen-${screen.name.toLowerCase().replace(' ', '-')}`,
                              `${screen.name} screen: ${screen.description}`
                            )}
                          >
                            <div className="rounded-md overflow-hidden mb-2">
                              <ImageWithFallback
                                src={screen.imageUrl}
                                alt={screen.name}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            <h4 className="font-medium">{screen.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {screen.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentSection.insights && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Key Insights</h3>
                      <ul className="space-y-2">
                        {currentSection.insights.map((insight: string, index: number) => (
                          <li 
                            key={index} 
                            className="flex items-start gap-2 cursor-pointer"
                            onClick={() => handleSelectElement(
                              `insight-${index}`,
                              insight
                            )}
                          >
                            <span className="bg-primary/10 text-primary rounded-full flex items-center justify-center h-5 w-5 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentSection.results && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Results</h3>
                      <Card className="p-4">
                        <ul className="space-y-2">
                          {currentSection.results.map((result: string, index: number) => (
                            <li 
                              key={index} 
                              className="flex items-start gap-2 cursor-pointer"
                              onClick={() => handleSelectElement(
                                `result-${index}`,
                                result
                              )}
                            >
                              <span className="text-primary">✓</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  )}

                  {currentSection.testimonial && (
                    <div className="mt-6">
                      <Card className="p-6 bg-accent/50 cursor-pointer" onClick={() => handleSelectElement(
                        `testimonial`,
                        `${currentSection.testimonial.quote} - ${currentSection.testimonial.author}`
                      )}>
                        <blockquote className="text-lg italic">
                          "{currentSection.testimonial.quote}"
                        </blockquote>
                        <cite className="block mt-2 text-right">— {currentSection.testimonial.author}</cite>
                      </Card>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="code" className="flex-1 p-4 overflow-auto">
              {currentSection.code ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{currentSection.code.fileName}</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShowCode(
                        currentSection.code.fileName,
                        currentSection.code.snippet,
                        currentSection.code.language
                      )}
                    >
                      View Full Code
                    </Button>
                  </div>
                  <Card className="bg-accent/20 p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      <code>{currentSection.code.snippet}</code>
                    </pre>
                  </Card>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Code Explanation</h4>
                    <p className="text-muted-foreground">
                      This code implements the {currentSection.title.toLowerCase()} for the EcoTrack application.
                      Click on specific parts of the code to get detailed explanations about design decisions and implementation details.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No code available for this section.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="details" className="flex-1 p-4 overflow-auto">
              <ScrollArea className="h-full">
                <div className="space-y-6 max-w-3xl mx-auto">
                  <h2 className="text-xl font-medium">{currentSection.title} - Details</h2>

                  <div className="space-y-4">
                    <h3>Design Decisions</h3>
                    <p>
                      In the {currentSection.title.toLowerCase()} phase of EcoTrack, we focused on creating an experience
                      that would be both informative and motivating for users tracking their environmental impact.
                    </p>

                    {currentSection.id === "ui-design" && (
                      <div>
                        <h4 className="font-medium mt-4">Color Psychology</h4>
                        <p className="mt-1">
                          The color palette was carefully selected to reinforce the sustainability theme:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Green represents growth, harmony, and environmental consciousness</li>
                          <li>Blue symbolizes water conservation and purity</li>
                          <li>Yellow reflects energy usage and awareness</li>
                          <li>Brown connects to earth and food consumption</li>
                        </ul>
                      </div>
                    )}

                    {currentSection.id === "wireframes" && (
                      <div>
                        <h4 className="font-medium mt-4">Information Architecture</h4>
                        <p className="mt-1">
                          The wireframes establish a clear hierarchy that prioritizes:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Immediate visibility of carbon footprint metrics</li>
                          <li>Easy comparison to previous periods</li>
                          <li>Breakdown by impact categories</li>
                          <li>Quick access to tracking tools and suggestions</li>
                        </ul>
                      </div>
                    )}

                    {currentSection.iterations && (
                      <div className="mt-4">
                        <h4 className="font-medium">Iterations Based on Testing</h4>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {currentSection.iterations.map((iteration: string, index: number) => (
                            <li key={index}>{iteration}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{dialogContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="bg-accent/20 p-4 rounded-md mt-2">
            <pre className="text-sm overflow-x-auto">
              <code>{dialogContent?.code}</code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}