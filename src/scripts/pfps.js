async function loadDiscordPfp(discordId, elementId) {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
    const result = await response.json();

    if (!result.success) {
      console.error(`Failed to fetch Lanyard data for ID: ${discordId}. Is the user in the Lanyard Discord server?`);
      return;
    }

    const user = result.data.discord_user;
    let avatarUrl = "";

    if (user.avatar) {
      // Check if avatar is animated (starts with 'a_')
      const extension = user.avatar.startsWith("a_") ? "gif" : "png";
      avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}`;
    } else {
      // Fallback for default avatars (updated formula)
      const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }

    // Update the image element
    const imgElement = document.getElementById(elementId);
    if (imgElement) {
      imgElement.src = avatarUrl;
    } else {
      console.warn(`Element with ID '${elementId}' not found on the page.`);
    }

  } catch (error) {
    console.error(`Error loading profile picture for ${discordId}:`, error);
  }
}

loadDiscordPfp("734445627915894824", "pfp-main");