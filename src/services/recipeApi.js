const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRecipes() {
  const res = await fetch(`${API_URL}/api/recipes`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}