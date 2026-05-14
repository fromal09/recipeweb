/** scoring.js — recipe matching and nudge application */
import { DEMO_RECIPES } from "../data/recipes.js";

export function scoreRecipes(ings, prefs) {
  const ingLower = ings.map(i => i.toLowerCase());
  return DEMO_RECIPES
    .map(r => {
      const overlap = r.tags.filter(t =>
        ingLower.some(i => i.includes(t) || t.includes(i))
      ).length;
      const cuisineBonus = prefs.cuisine &&
        r.cuisine.toLowerCase().includes(prefs.cuisine.toLowerCase()) ? 4 : 0;
      const skillBonus = (prefs.skill === "Beginner" && r.difficulty === "Easy") ||
                         (prefs.skill === "Advanced"  && r.difficulty === "Advanced") ? 2 : 0;
      return { recipe: r, score: overlap + cuisineBonus + skillBonus };
    })
    .sort((a,b) => b.score - a.score)
    .slice(0, 4)
    .map(x => x.recipe);
}

export function applyNudge(recipe, nudge) {
  const r = JSON.parse(JSON.stringify(recipe)); // deep copy
  const n = nudge.toLowerCase();

  let noteKey = "bolder";
  if (n.includes("spici"))                                  noteKey = "spicy";
  else if (n.includes("vegetarian") || n.includes("vegan")) noteKey = "vegetarian";
  else if (n.includes("richer"))                            noteKey = "richer";
  else if (n.includes("quicker") || n.includes("quick"))   noteKey = "quicker";
  else if (n.includes("vegetable") || n.includes("veggie")) noteKey = "veggie";
  else if (n.includes("simpl"))                             noteKey = "simpler";
  else if (n.includes("heartier") || n.includes("hearty")) noteKey = "heartier";
  else if (n.includes("lighter") || n.includes("light"))   noteKey = "lighter";
  else if (n.includes("protein") || n.includes("swap"))    noteKey = "protein";

  if (noteKey === "spicy" && !r.ingredients.some(i => i.item.includes("chili") || i.item.includes("pepper"))) {
    r.ingredients.push({ amount: "½–1 tsp", item: "dried chili flakes or chili oil", note: "to taste" });
  }
  if (noteKey === "veggie") {
    r.ingredients.push({ amount: "handful", item: "seasonal vegetables", note: "see Nana's note for suggestions" });
  }
  if (noteKey === "richer" && !r.ingredients.some(i => i.item.includes("cream") || i.item.includes("butter"))) {
    r.ingredients.push({ amount: "1 tbsp", item: "unsalted butter", note: "cold, stirred in at the end" });
  }

  r.refinement = nudge;
  r.nanaNote = recipe.nudgeNotes?.[noteKey] || recipe.nanaNote;
  return r;
}
