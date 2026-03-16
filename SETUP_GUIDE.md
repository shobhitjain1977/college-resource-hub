# 🎯 QUICK START GUIDE (For Absolute Beginners)

Follow these steps EXACTLY in order. Total time: 15-20 minutes.

## ✅ Step 1: Install Node.js (If you don't have it)

1. Go to https://nodejs.org
2. Download the LTS version (left button)
3. Install it (keep clicking Next)
4. Open Terminal/Command Prompt and type: `node --version`
5. You should see a version number like v18.x.x

## ✅ Step 2: Extract and Open Project

1. Extract the `college-resource-hub.zip` file
2. Open Terminal/Command Prompt
3. Navigate to the project folder:
   ```bash
   cd path/to/college-resource-hub
   ```

## ✅ Step 3: Install Dependencies

In the terminal, run:
```bash
npm install
```

Wait 2-3 minutes for it to finish.

## ✅ Step 4: Set Up Supabase (Your Database)

### 4a. Create Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or Email

### 4b. Create New Project
1. Click "New Project"
2. Fill in:
   - **Name**: `college-resource-hub`
   - **Database Password**: Choose something strong (SAVE THIS!)
   - **Region**: Select closest to your location
3. Click "Create new project"
4. **WAIT 2-3 MINUTES** for it to set up

### 4c. Create Database Table
1. In Supabase dashboard, click **"SQL Editor"** on left sidebar
2. Click **"New Query"**
3. Copy this ENTIRE code and paste it:

```sql
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

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON resources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON resources
  FOR UPDATE USING (true);
```

4. Click **"Run"** button (bottom right)
5. You should see "Success. No rows returned"

### 4d. Create Storage Bucket
1. Click **"Storage"** on left sidebar
2. Click **"New Bucket"** button
3. **Bucket name**: `resources` (exactly this)
4. Toggle **"Public bucket"** to ON
5. Click **"Create bucket"**

### 4e. Set Storage Policy
1. Click on the `resources` bucket you just created
2. Go to **"Policies"** tab
3. Click **"New Policy"**
4. Click **"For full customization"**
5. Fill in:
   - **Policy name**: `Public Access`
   - **Target roles**: Check `public`
   - **Policy command**: Check all (SELECT, INSERT, UPDATE, DELETE)
6. Click **"Review"** then **"Save policy"**

### 4f. Get Your API Keys
1. Click **"Settings"** (gear icon) on left sidebar
2. Click **"API"**
3. You'll see two things:
   - **Project URL**: Something like `https://abcdefgh.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`
4. **KEEP THIS TAB OPEN** - you'll need these in the next step!

## ✅ Step 5: Configure Environment Variables

1. In your project folder, find the file `.env.example`
2. Make a copy and rename it to `.env.local`
3. Open `.env.local` with Notepad/TextEdit
4. Replace the values with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Save the file

## ✅ Step 6: Run Your App Locally

In terminal, run:
```bash
npm run dev
```

You should see:
```
✓ Ready in 2.3s
○ Local: http://localhost:3000
```

Open your browser and go to: **http://localhost:3000**

🎉 **YOUR APP IS RUNNING!**

## ✅ Step 7: Test It

1. Click "Upload Resource" button
2. Fill in the form
3. Select a PDF or image file
4. Click Upload
5. Your resource should appear!

## 🚀 Step 8: Deploy Online (FREE)

### Deploy to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" → Sign up with GitHub
3. Click "Add New..." → "Project"
4. Click "Import" on your repository
5. Add Environment Variables (click "Add"):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase key
6. Click "Deploy"
7. Wait 2 minutes
8. **YOUR APP IS LIVE!** 🚀

You'll get a URL like: `your-app.vercel.app`

## 📸 For Your College Presentation

Take screenshots of:
1. ✅ Homepage with resources
2. ✅ Upload modal
3. ✅ Filter functionality
4. ✅ Resource cards with upvotes
5. ✅ Responsive design (mobile view)

## 🐛 Common Issues

**"Module not found" error**
```bash
rm -rf node_modules
npm install
```

**"Can't connect to Supabase"**
- Double-check `.env.local` has correct URL and key
- Make sure no extra spaces in `.env.local`

**"Upload failed"**
- Verify storage bucket is PUBLIC
- Check storage policies are set

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```
Then open http://localhost:3001

## 🎓 What to Tell Your Instructor

**Tech Stack:**
- Frontend: Next.js 14 (React framework)
- Backend: Supabase (PostgreSQL database)
- Styling: Tailwind CSS
- Animations: Framer Motion

**Features:**
- Full CRUD operations
- File upload to cloud storage
- Real-time filtering
- Upvote system
- Responsive design
- Deployed to production

**Why it's impressive:**
- Production-ready code
- Modern tech stack used by companies
- Deployed online (not just localhost)
- Solves a real college problem
- Clean, professional UI

---

**Need Help?**
- Check README.md for more details
- Search error messages on Google
- Ask ChatGPT/Claude for debugging

**Good luck with your internship project! 🎉**
