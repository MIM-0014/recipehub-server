const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRecipes(categories = []) {
  let url = `${API_URL}/api/recipes`;

  if (categories.length > 0) {
    url += `?categories=${categories.join(",")}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}