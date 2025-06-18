"use client";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Calculator = () => {
  const [result, setResult] = useState(null);
  const [data, setData] = useState({
    cal: "",
    fscMarks: "",
    fscTotal: "",
    isSelect: true,
    matricMarks: "",
    matricTotal: "",
    mdcatMarks: "",
    totalMdcatMarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fsc = Number(data.fscMarks);
    const fscTotal = Number(data.fscTotal);
    const mdcat = Number(data.mdcatMarks);
    const mdcatTotal = Number(data.totalMdcatMarks);
    const matric = Number(data.matricMarks);
    const matricTotal = Number(data.matricTotal);

    if (
      !data.cal ||
      !fsc || !fscTotal ||
      !mdcat || !mdcatTotal ||
      (data.isSelect && (!matric || !matricTotal)) ||
      fsc > fscTotal ||
      mdcat > mdcatTotal ||
      (data.isSelect && matric > matricTotal)
    ) {
      setResult("❌ Please enter valid and complete marks information.");
      return;
    }

    const mdcatWeightage = 0.5;
    const fscWeightage = 0.4;
    const matricWeightage = 0.1;

    const mdcatScore = (mdcat / mdcatTotal) * 100 * mdcatWeightage;
    const fscScore = (fsc / fscTotal) * 100 * fscWeightage;
    const matricScore = data.isSelect ? (matric / matricTotal) * 100 * matricWeightage : 0;

    const res = mdcatScore + fscScore + matricScore;
    setResult(`✅ Your Aggregate: ${res.toFixed(2)}%`);
  };

  return (
    <Box component="section" py={8} px={2} bgcolor="#f9fafb">
      <Paper elevation={4} sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" fontWeight={700} mb={4} color="primary">
          Aggregate Calculator
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Box mb={3}>
            <FormControl fullWidth required>
              <InputLabel id="cal-label">Select Exam Type</InputLabel>
              <Select
                labelId="cal-label"
                name="cal"
                value={data.cal}
                label="Select Exam Type"
                onChange={handleChange}
              >
                <MenuItem value="mdcat">Mdcat</MenuItem>
                <MenuItem value="nums">NUMS</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2} mb={3}>
            <TextField
              label="FSc Marks"
              type="number"
              name="fscMarks"
              value={data.fscMarks}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="FSc Total"
              type="number"
              name="fscTotal"
              value={data.fscTotal}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={data.isSelect}
                onChange={() =>
                  setData((prev) => ({ ...prev, isSelect: !prev.isSelect }))
                }
              />
            }
            label="Include Matriculation"
            sx={{ mb: 2 }}
          />

          {data.isSelect && (
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2} mb={3}>
              <TextField
                label="Matric Marks"
                type="number"
                name="matricMarks"
                value={data.matricMarks}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Matric Total"
                type="number"
                name="matricTotal"
                value={data.matricTotal}
                onChange={handleChange}
                required
                fullWidth
              />
            </Box>
          )}

          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2} mb={3}>
            <TextField
              label="MDCAT Marks"
              type="number"
              name="mdcatMarks"
              value={data.mdcatMarks}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Total MDCAT Marks"
              type="number"
              name="totalMdcatMarks"
              value={data.totalMdcatMarks}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, fontWeight: 600, fontSize: '1rem' }}
          >
            Calculate
          </Button>

          {result && (
            <Typography
              align="center"
              mt={4}
              color={result.startsWith("✅") ? "success.main" : "error.main"}
              fontWeight={600}
            >
              {result}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Calculator;