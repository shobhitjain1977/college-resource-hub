# 🎓 College Resource Hub

A beautiful, modern platform for college students to share and discover study materials, notes, and resources.

![College Resource Hub](https://img.shields.io/badge/Next.js-14-black) ![Supabase](https://img.shields.io/badge/Supabase-Powered-green) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)

## ✨ Features

- 📤 **Upload Resources** - Share PDFs, documents, presentations, and images
- 🔍 **Smart Filtering** - Filter by semester, subject, or search by keywords
- ❤️ **Upvote System** - Community-driven quality ranking
- 📱 **Responsive Design** - Works beautifully on all devices
- ⚡ **Fast & Modern** - Built with Next.js 14 and Framer Motion animations

## 🚀 Quick Setup (15 Minutes)

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Supabase

1. **Go to [supabase.com](https://supabase.com) and create a free account**

2. **Create a new project:**
   - Project name: `college-resource-hub`
   - Database password: (choose a strong password)
   - Region: Choose closest to you
   - Wait 2-3 minutes for setup

3. **Create the database table:**
   - Go to SQL Editor in Supabase dashboard
   - Click "New Query"
   - Copy-paste this SQL:

```sql
-- Create resources table
CREATE TABLE resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  semester TEXT NOT NULL,
  subject TEXT NOT NULL,
  uploaded_by TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading all resources
CREATE POLICY "Allow public read access" ON resources
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert resources
CREATE POLICY "Allow public insert access" ON resources
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to update upvotes
CREATE POLICY "Allow public update access" ON resources
  FOR UPDATE USING (true);
```

   - Click "Run" button

4. **Set up Storage:**
   - Go to Storage section
   - Click "New Bucket"
   - Bucket name: `resources`
   - Make it **PUBLIC**
   - Click "Create bucket"

5. **Configure Storage Policy:**
   - Click on `resources` bucket
   - Go to "Policies" tab
   - Click "New Policy"
   - Select "For full customization"
   - Policy name: `Public Access`
   - Target roles: `public`
   - Check all operations (SELECT, INSERT, UPDATE, DELETE)
   - Click "Review" then "Save policy"

### Step 3: Configure Environment Variables

1. In Supabase dashboard, go to **Settings** → **API**

2. Copy your:
   - Project URL
   - `anon` `public` key

3. Create `.env.local` file in project root:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 📤 Deploy to Production

### Deploy to Vercel (Recommended - FREE)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables (same as `.env.local`)
6. Click "Deploy"
7. Your app will be live in 2 minutes! 🚀

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    // Change these values
    600: '#cc4634',
    700: '#ab3727',
  },
}
```

### Add More Subjects

Edit `components/FilterBar.js` and `components/UploadModal.js`:

```js
const SUBJECTS = [
  'all',
  'Mathematics',
  'Your New Subject',  // Add here
  // ...
]
```

### Modify File Types

Edit `components/UploadModal.js`:

```js
accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"  // Add more types
```

## 📁 Project Structure

```
college-resource-hub/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Main page with all logic
│   └── globals.css        # Global styles
├── components/
│   ├── Header.js          # Top navigation
│   ├── FilterBar.js       # Search and filters
│   ├── ResourceCard.js    # Individual resource display
│   └── UploadModal.js     # Upload form
├── lib/
│   └── supabase.js        # Supabase client
└── public/
```

## 🐛 Troubleshooting

### "Error fetching resources"
- Check if Supabase URL and key are correct in `.env.local`
- Verify the `resources` table exists in Supabase

### "Upload failed"
- Make sure `resources` storage bucket is PUBLIC
- Check storage policies are set correctly

### "Can't see uploaded files"
- Verify file was uploaded to Supabase Storage
- Check if `file_url` is correctly saved in database

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Comments on resources
- [ ] Bookmark/favorite resources
- [ ] Download tracking
- [ ] Tags system
- [ ] Resource recommendations
- [ ] Admin dashboard

## 📄 License

MIT License - feel free to use this for your college project!

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for college students**

Need help? Open an issue or contact your instructor!
