# Deployment Guide - Vercel

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub repository (✅ Already done)
- Vercel account (free at [vercel.com](https://vercel.com))
- Database hosting (recommended: PlanetScale, Railway, or Supabase)

### Step 1: Database Setup (Choose One)

#### Option A: PlanetScale (Recommended)
1. Go to [planetscale.com](https://planetscale.com) and sign up
2. Create a new database: `task-manager-db`
3. Import your schema from `database/schema.sql`
4. Get connection string from dashboard

#### Option B: Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Create new project → Add MySQL
3. Import schema from `database/schema.sql`
4. Get connection details

#### Option C: Supabase
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create new project
3. Use SQL editor to run `database/schema.sql`
4. Get connection string

### Step 2: Deploy to Vercel

#### Method 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository: `Vasudha293/Task-Manager-App`
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: task-manager-app
# - Directory: ./
# - Override settings? No
```

### Step 3: Environment Variables
In Vercel dashboard, go to Project Settings → Environment Variables and add:

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
NODE_ENV=production
```

### Step 4: Update CORS Settings
After deployment, update the CORS origin in `backend/server.js`:
```javascript
origin: ['https://your-app-name.vercel.app']
```

### Step 5: Redeploy
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Vercel will automatically redeploy.

## 🔗 Your Live App
After deployment, your app will be available at:
`https://your-project-name.vercel.app`

## 📱 Features Available
- ✅ Task creation, editing, deletion
- ✅ Drag and drop functionality
- ✅ Priority filtering and sorting
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Professional UI

## 🛠️ Troubleshooting

### Common Issues:
1. **Database Connection**: Ensure environment variables are correct
2. **CORS Errors**: Update allowed origins in server.js
3. **Build Failures**: Check all dependencies are in package.json
4. **API Routes**: Ensure `/api/*` routes are working

### Support:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: Create issue in your repository