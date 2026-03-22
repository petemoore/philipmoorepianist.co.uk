# Philip Moore — Pianist Website

This is the source for [philipmoorepianist.co.uk](https://www.philipmoorepianist.co.uk). It's built with Jekyll and hosted free on GitHub Pages. Any changes pushed to `main` are automatically published within about 30 seconds.

## How to edit content

You can edit everything directly on GitHub — click any file, then click the pencil icon to edit. When you're done, click "Commit changes" at the bottom.

### Pages you'll want to edit

| File | What it controls |
|------|-----------------|
| `index.md` | **Home page** — your biography |
| `piano-duo.md` | **Piano Duo** — the duo partnership text |
| `recordings.md` | **Recordings** — links to Spotify, Apple Music, etc. |
| `news.md` | **News** — the intro text at the top of the News page |
| `_data/news.yml` | **News entries** — the photo gallery |
| `_data/reviews.yml` | **Reviews** — all review quotes |
| `_data/videos.yml` | **Videos** — YouTube video listings |

### Editing biography text

Open `index.md` or `piano-duo.md` and edit the text directly. It uses Markdown:

- `**bold text**` for **bold**
- `*italic text*` for *italic*
- `[link text](https://example.com)` for links
- Leave a blank line between paragraphs

The settings at the top between `---` markers control the banner image and other options — you can leave those alone.

### Adding a news entry

Open `_data/news.yml` and add a new entry at the **top** of the file (newest first):

```yaml
- image: news/my-photo.jpg
  caption: "Description of what's happening in the photo."
  location: "Venue name"
  date: "Month Year"
```

You'll also need to upload the photo to `assets/images/news/`. On GitHub, navigate to that folder and click "Add file" → "Upload files". Keep images under 1MB if possible (resize to about 1200px wide).

To add a Spotify embed in the news feed:

```yaml
- type: spotify
  spotify_id: "track/SPOTIFY_TRACK_ID"
  height: 152
```

To add a YouTube video in the news feed:

```yaml
- type: youtube
  youtube_id: VIDEO_ID_HERE
  caption: "Description"
```

### Adding a review

Open `_data/reviews.yml` and add a new entry under the appropriate section (`concert_solo`, `concert_duo`, `recording_solo`, or `recording_duo`):

```yaml
  - source: "Publication Name"
    quote: "The review text goes here."
```

For recording reviews under `recording_duo`, reviews are grouped by album:

```yaml
  - album: "Album Title (Label)"
    reviews:
      - source: "Publication Name"
        quote: "The review text."
```

### Adding a video

Open `_data/videos.yml` and add a new entry under the appropriate section, or create a new section:

```yaml
- section: "Venue, Date"
  items:
    - type: youtube
      id: VIDEO_ID_HERE
      caption: "Description of the performance"
```

The video ID is the part after `v=` in a YouTube URL. For example, in `https://www.youtube.com/watch?v=abc123`, the ID is `abc123`.

### Changing the banner image on a page

Each page can have a banner image set in the settings at the top:

```yaml
---
banner_image: my-banner.jpg
---
```

Upload the image to `assets/images/` and update the filename. Wide landscape photos work best for banners.

### Changing the recordings playlist

In `recordings.md`, find the line with `spotify.html` and change the playlist ID:

```
{% include spotify.html id="playlist/YOUR_PLAYLIST_ID" height="352" %}
```

The playlist ID is the part after `playlist/` in a Spotify URL.

## Files you don't need to touch

| Folder/file | Purpose |
|------------|---------|
| `_layouts/` | HTML templates that control page structure |
| `_includes/` | Reusable HTML components (header, footer, embeds) |
| `assets/css/` | Styling |
| `assets/js/` | JavaScript (menu toggle, video player) |
| `_config.yml` | Site configuration |
| `.github/` | Automated deployment |
| `Gemfile` | Ruby dependencies for Jekyll |
| `favicon.svg` | Browser tab icon |

## Need help?

Ask Pete! Or consult the [Markdown guide](https://www.markdownguide.org/basic-syntax/) for formatting help.
