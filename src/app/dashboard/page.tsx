"use client"

import { Box, Grid, Card, CardContent, CardActionArea, Typography, Avatar, Chip } from "@mui/material"
import {
  Science as ScienceIcon,
  Calculate as MathIcon,
  Language as EnglishIcon,
  History as HistoryIcon,
  Public as GeographyIcon,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"

const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: <MathIcon />,
    color: "#2196F3",
    chapters: 12,
    progress: 75,
  },
  {
    id: "physics",
    name: "Physics",
    icon: <ScienceIcon />,
    color: "#FF9800",
    chapters: 15,
    progress: 60,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: <ScienceIcon />,
    color: "#4CAF50",
    chapters: 10,
    progress: 45,
  },
  {
    id: "english",
    name: "English",
    icon: <EnglishIcon />,
    color: "#9C27B0",
    chapters: 8,
    progress: 80,
  },
  {
    id: "history",
    name: "History",
    icon: <HistoryIcon />,
    color: "#795548",
    chapters: 14,
    progress: 30,
  },
  {
    id: "geography",
    name: "Geography",
    icon: <GeographyIcon />,
    color: "#607D8B",
    chapters: 11,
    progress: 55,
  },
]

export default function SelectSubject() {
  const router = useRouter()

  const handleSubjectClick = (subjectId: string) => {
    router.push(`/dashboard/subject/${subjectId}`)
  }

  return (
    <Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choose a subject to continue your learning journey
      </Typography>

      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.id}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardActionArea onClick={() => handleSubjectClick(subject.id)} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3, height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: subject.color,
                        width: 48,
                        height: 48,
                        mr: 2,
                      }}
                    >
                      {subject.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {subject.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {subject.chapters} chapters
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Chip
                      label={`${subject.progress}% Complete`}
                      size="small"
                      color={subject.progress > 70 ? "success" : subject.progress > 40 ? "warning" : "default"}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
