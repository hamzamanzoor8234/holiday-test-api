import express, { Request, Response, Router } from "express";
import { fetchCountries, fetchHolidays } from "./services";
import { getCache, setCache } from "./cache";
import { config } from "./config";

const router: Router = express.Router();

// GET /holidays?country=PAK&year=2024
router.get("/holidays", async (req: Request, res: Response) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return res.status(400).json({ error: "Country and year are required" });
  }

  const cacheKey: string = `holidays_${country}_${year}`;
  let holidays: any = await getCache(cacheKey);

  if (holidays) {
    return res.json({ holidays });
  }
  try {
    const response: any = await fetchHolidays(
      country as string,
      parseInt(year as string, 10)
    );
    if (response.meta.code === 200) {
      holidays = (response.response.holidays||[]);
      await setCache(cacheKey, holidays, config.cacheTTL);
      res.json({ holidays });
    } else {
      return res
        .status(response.meta.code)
        .json({ error: response.meta.message });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch holidays" });
  }
});
router.get("/countries", async (req: Request, res: Response) => {
  const cacheKey: string = "countries";
  let countries: any = await getCache(cacheKey);
  if (countries) {
    return res.json({ countries });
  }
  try {
    const response: any = await fetchCountries();
    if (response.meta.code === 200) {
      countries = response.response.countries;
      await setCache(cacheKey, countries, config.cacheTTL);
      res.json({ countries });
    } else {
      return res
        .status(response.meta.code)
        .json({ error: response.meta.message });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch countries" });
  }
});
export default router;
