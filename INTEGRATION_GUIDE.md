# Frontend-Backend Integration Guide

## ✅ Integration Complete!

The frontend is now connected to your AI backend agent. When users describe their medical situation in the chat, the frontend will send a request to the backend and display the AI-generated assessment and action steps.

---

## 🔧 What Was Done

### 1. **API Service Created** ([src/lib/api.ts](src/lib/api.ts))

- TypeScript API client for backend communication
- Type-safe interfaces matching backend response format
- Error handling and health check functionality
- Helper functions for formatting actions

### 2. **Environment Configuration**

- [.env](../.env) - Current API URL configuration
- [.env.example](../.env.example) - Template for deployment

**Local Development:**

```
VITE_API_URL=http://localhost:8000
```

**Production (after Render deployment):**

```
VITE_API_URL=https://your-app.onrender.com
```

### 3. **ChatBot Integration** ([src/pages/ChatBot.tsx](src/pages/ChatBot.tsx))

- Replaced hardcoded responses with real AI backend calls
- Added loading states during API calls
- Dynamic panic level based on severity (critical → panic, high → stressed, low → calm)
- Formatted responses showing:
  - Assessment and reassurance
  - Critical actions (🚨)
  - Normal immediate actions
  - Things to avoid (⚠️)
  - Emergency escalation info
- Auto-navigation to escalation page for critical cases

---

## 🚀 How It Works

### User Flow:

1. **User enters medical situation** in chat (or uses voice input in Hindi)
2. **Frontend sends POST request** to `http://localhost:8000/medical`
3. **Backend AI agent processes** the input through multiple nodes:
   - Input normalization
   - Crisis classification
   - Risk assessment
   - Action planning
   - Output formatting
4. **Backend returns structured JSON** with assessment and actions
5. **Frontend displays** formatted response with severity indicators
6. **Auto-escalation** if critical emergency detected

### Request Format:

```typescript
{
  "user_input": "My father is experiencing chest pain",
  "session_id": "session-1234567890"  // Auto-generated
}
```

### Response Format:

```typescript
{
  "session_id": "uuid",
  "crisis_type": "Cardiac Emergency",
  "severity_level": "critical",
  "assessment": "Detailed assessment...",
  "immediate_actions": [
    {
      "step_id": "step_1",
      "order": 1,
      "action": "Call 911 immediately",
      "is_critical": true,
      "completed": false
    }
  ],
  "do_not_do": ["Do not give aspirin..."],
  "escalation_required": true,
  "who_to_contact": ["Emergency Services (911)"],
  "escalation_reason": "Critical cardiac symptoms",
  "reassurance_message": "Help is on the way...",
  "timestamp": "2026-02-11T..."
}
```

---

## 🧪 Testing Locally

### 1. Start Backend Server

```bash
cd CalmPath_Backend
PYTHONPATH=/Users/bhomikvarshney/Desktop/AmuHacksMain python CalmPath_Backend/api.py
```

Backend will run on: http://localhost:8000

### 2. Start Frontend Development Server

```bash
cd CalmPath_Frontend
npm run dev
```

Frontend will run on: http://localhost:5173 (or the port shown)

### 3. Test the Integration

1. Navigate to the app: http://localhost:5173
2. Click "Start" → Select a crisis type (e.g., Medical Emergency)
3. Type a medical situation: "My father has chest pain and is sweating"
4. Watch as the AI agent provides real-time assessment! 🎉

---

## 📡 API Endpoints Available

### Frontend Uses:

- `POST /medical` - Main endpoint for crisis assessment

### Other Available Endpoints:

- `GET /health` - Health check
- `GET /docs` - Interactive API documentation
- `GET /api/v1/session/{session_id}` - Get session history
- `GET /api/v1/stats` - Get usage statistics

View full API docs at: http://localhost:8000/docs

---

## 🌐 Production Deployment

### After deploying backend to Render:

1. **Get your Render URL** (e.g., `https://calmpath-backend.onrender.com`)

2. **Update frontend .env file:**

   ```bash
   VITE_API_URL=https://calmpath-backend.onrender.com
   ```

3. **Rebuild and deploy frontend:**

   ```bash
   npm run build
   ```

4. **Deploy to Vercel/Netlify:**
   - Make sure to set the environment variable in deployment settings
   - `VITE_API_URL=https://your-render-url.onrender.com`

---

## 🔍 Features Integrated

### ✅ AI-Powered Assessment

- Real-time crisis classification
- Severity level detection (low/moderate/high/critical)
- Context-aware action planning

### ✅ Dynamic UI Responses

- Panic indicator changes based on severity
- Critical actions highlighted with 🚨
- Progressive message display for better UX

### ✅ Multilingual Support

- Voice input in Hindi (हिंदी)
- Auto-translation to English for API
- Works with both Hindi and English text

### ✅ Emergency Handling

- Auto-detect critical situations
- Display escalation requirements
- Navigate to emergency page when needed

### ✅ Session Management

- Unique session ID per conversation
- Backend stores conversation history
- Can retrieve past assessments

---

## 🐛 Troubleshooting

### Issue: "Network Error" or "Failed to fetch"

**Solution:**

1. Check if backend is running: `curl http://localhost:8000/health`
2. Verify CORS is enabled (already configured in backend)
3. Check browser console for specific error
4. Ensure .env file is loaded: `console.log(import.meta.env.VITE_API_URL)`

### Issue: Backend returns 500 error

**Solution:**

1. Check backend terminal for error logs
2. Verify GROQ_API_KEY is set in backend .env
3. Check backend logs in Render dashboard (production)

### Issue: Response is slow

**Expected Behavior:**

- First request after backend idle: 30-60 seconds (cold start on Render free tier)
- Subsequent requests: 3-5 seconds (AI processing time)

**Solutions:**

- Use paid Render plan to avoid cold starts
- Set up keep-alive ping (see backend RENDER_DEPLOYMENT.md)

---

## 📊 Example Test Cases

### Test Case 1: Minor Issue

**Input:** "I have a mild headache"
**Expected:**

- Severity: low
- Calm reassurance
- Basic actions (rest, hydration)
- No escalation

### Test Case 2: Serious Issue

**Input:** "My father has chest pain and is sweating"
**Expected:**

- Severity: critical
- Panic indicator activated
- Critical actions highlighted (🚨 Call 911)
- Escalation required
- Auto-navigate to emergency page

### Test Case 3: Fire Emergency

**Input:** "There's smoke coming from the kitchen"
**Expected:**

- Crisis type: Fire Emergency
- Immediate evacuation steps
- Call fire department
- Safety precautions

---

## 🎯 Next Steps

1. **Deploy Backend to Render** (see [../CalmPath_Backend/RENDER_DEPLOYMENT.md](../CalmPath_Backend/RENDER_DEPLOYMENT.md))
2. **Update frontend .env** with Render URL
3. **Deploy Frontend** to Vercel/Netlify
4. **Test end-to-end** in production
5. **Monitor usage** via Langfuse dashboard

---

## 📚 Related Documentation

- [Backend API Documentation](http://localhost:8000/docs)
- [Render Deployment Guide](../CalmPath_Backend/RENDER_DEPLOYMENT.md)
- [API Client Source](src/lib/api.ts)
- [ChatBot Implementation](src/pages/ChatBot.tsx)

---

## 💡 Pro Tips

1. **Keep backend running** during frontend development for faster testing
2. **Use browser DevTools** Network tab to inspect API calls
3. **Check backend logs** for detailed error messages
4. **Use quick presets** in chat for faster testing
5. **Monitor Langfuse** for observability in production

---

## ✨ You're All Set!

Your frontend is now fully integrated with the AI backend agent! Users can describe their medical situations and receive real-time, AI-powered guidance with step-by-step action plans. 🎉

**Test it now:**

1. Start both servers
2. Go to http://localhost:5173
3. Select a crisis type
4. Describe a medical situation
5. Watch the magic happen! ✨
