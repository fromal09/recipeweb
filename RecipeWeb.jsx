/**
 * RecipeWeb.jsx — root component
 *
 * Entry point for the app. Manages all top-level state and screen routing.
 * Each screen is a separate module; see src/screens/ for individual files.
 */
import { useState, useEffect, useRef, useCallback } from "react";

import { FONTS, TUTORIAL } from "./src/constants/config.js";
import { scoreRecipes, applyNudge } from "./src/logic/scoring.js";

import { WormholeCanvas }        from "./src/components/WormholeCanvas.jsx";
import { KitchenScreen }         from "./src/screens/KitchenScreen.jsx";
import { FridgeScreen }          from "./src/screens/FridgeScreen.jsx";
import { PickerScreen }          from "./src/screens/PickerScreen.jsx";
import { RecipeScreen }          from "./src/screens/RecipeScreen.jsx";
import { SavedScreen }           from "./src/screens/SavedScreen.jsx";
import { WorldCuisineScreen }    from "./src/screens/WorldCuisineScreen.jsx";
import { TechniqueLibraryScreen }from "./src/screens/TechniqueLibraryScreen.jsx";

import { SpiceArchiveScreen }    from "./src/screens/SpiceArchiveScreen.jsx";

export default function RecipeWeb() {
  const [screen,      setScreen]      = useState("kitchen");
  const [animPhase,   setAnimPhase]   = useState(null);
  const [tutStep,     setTutStep]     = useState(0);
  const [tutDone,     setTutDone]     = useState(false);
  const [ings,        setIngs]        = useState([]);
  const [inputVal,    setInputVal]    = useState("");
  const [prefs,       setPrefs]       = useState({ mode: "classic", cuisine: "", dietary: "", time: "30–45 min", skill: "Intermediate" });
  const [matches,     setMatches]     = useState([]);
  const [recipe,      setRecipe]      = useState(null);
  const [saved,       setSaved]       = useState([]);
  const [techniqueId, setTechniqueId] = useState(null);
  const [recipeSaved, setRecipeSaved] = useState(false);
  const timers = useRef([]);

  // Load fonts + start tutorial after mount
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = FONTS;
    document.head.appendChild(l);
    setTimeout(() => setTutStep(1), 800);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const tick = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };

  // Fridge open animation: door → wormhole → burst → fridge screen
  const openFridge = useCallback(() => {
    if (animPhase) return;
    timers.current.forEach(clearTimeout); timers.current = [];
    setAnimPhase("door");
    tick(() => setAnimPhase("wormhole"), 800);
    tick(() => setAnimPhase("burst"),    1700);
    tick(() => { setScreen("fridge"); setAnimPhase(null); }, 2700);
  }, [animPhase]);

  const goTo = useCallback((nav) => {
    if (nav === "fridge") { openFridge(); return; }
    setScreen(nav);
  }, [openFridge]);

  const nextTut = () => {
    if (tutStep >= TUTORIAL.length) setTutDone(true);
    else setTutStep(s => s + 1);
  };

  const addIng = () => {
    const v = inputVal.trim();
    if (v && !ings.includes(v.toLowerCase())) setIngs(p => [...p, v.toLowerCase()]);
    setInputVal("");
  };

  const findRecipes = useCallback(() => {
    if (!ings.length) return;
    setMatches(scoreRecipes(ings, prefs));
    setScreen("picker");
  }, [ings, prefs]);

  const selectRecipe = (r) => { setRecipe(r); setRecipeSaved(false); setScreen("recipe"); };

  const applyNudgeToRecipe = (nudge) => {
    if (!recipe) return;
    setRecipe(applyNudge(recipe, nudge));
    setRecipeSaved(false);
  };

  const saveRecipe = () => {
    if (recipe && !recipeSaved) {
      setSaved(p => [...p, { ...recipe, id: Date.now(), date: new Date().toLocaleDateString() }]);
      setRecipeSaved(true);
    }
  };

  const step = !tutDone && tutStep > 0 ? TUTORIAL[tutStep - 1] : null;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0F0804", fontFamily: "'Lora',Georgia,serif" }}>
      <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", borderRadius: 24, boxShadow: "0 40px 100px rgba(0,0,0,0.85)" }}>

        {/* Kitchen + fridge door animation */}
        {(screen === "kitchen" || animPhase === "door") && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <KitchenScreen
              step={step} stepNum={tutStep} total={TUTORIAL.length}
              onNext={nextTut} onNav={goTo} doorOpen={animPhase === "door"}
            />
          </div>
        )}

        {/* Wormhole animation overlay */}
        {(animPhase === "wormhole" || animPhase === "burst") && (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, animation: "wIn .4s ease-out forwards" }}>
            <style>{`@keyframes wIn{from{opacity:0}to{opacity:1}}`}</style>
            <WormholeCanvas phase={animPhase} />
          </div>
        )}

        {screen === "fridge" && !animPhase && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <FridgeScreen
              ings={ings} inputVal={inputVal} setInputVal={setInputVal}
              addIng={addIng} removeIng={i => setIngs(p => p.filter(x => x !== i))}
              prefs={prefs} setPrefs={setPrefs}
              onFind={findRecipes} onBack={() => setScreen("kitchen")}
            />
          </div>
        )}

        {screen === "picker" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <PickerScreen matches={matches} onSelect={selectRecipe} onBack={() => setScreen("fridge")} />
          </div>
        )}

        {screen === "recipe" && recipe && !animPhase && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <RecipeScreen
              recipe={recipe} onBack={() => setScreen("picker")}
              onSave={saveRecipe} isSaved={recipeSaved}
              onNudge={applyNudgeToRecipe}
              onTechnique={(id) => { setTechniqueId(id); setScreen("techniques"); }}
            />
          </div>
        )}

        {screen === "saved" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <SavedScreen
              recipes={saved}
              onSelect={r => { setRecipe(r); setRecipeSaved(true); setScreen("recipe"); }}
              onBack={() => setScreen("kitchen")}
            />
          </div>
        )}

        {screen === "map" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <WorldCuisineScreen
              onBack={() => setScreen("kitchen")}
              onCook={(tags) => { setIngs(tags); setScreen("fridge"); }}
            />
          </div>
        )}

        {screen === "techniques" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <TechniqueLibraryScreen onBack={() => setScreen("kitchen")} initialId={techniqueId} />
          </div>
        )}

        {screen === "spices" && (
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <SpiceArchiveScreen
              onBack={() => setScreen("kitchen")}
              onGrab={(spiceName) => {
                setIngs(p => p.includes(spiceName) ? p : [...p, spiceName]);
                setScreen("fridge");
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}
