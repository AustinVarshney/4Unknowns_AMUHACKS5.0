// API Configuration and Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const FIRE_EMERGENCY_API_URL = import.meta.env.VITE_FIRE_API_URL || 'http://localhost:8001';

export interface AssessmentRequest {
  user_input: string;
  session_id?: string;
}

export interface ImmediateAction {
  step_id: string | number;
  order: number;
  action: string;
  is_critical: boolean;
  completed: boolean;
  // Backend might return these fields
  title?: string;
  instruction?: string;
  critical?: boolean;
  duration_seconds?: number | null;
}

export interface AssessmentResponse {
  session_id: string;
  user_prompt: string;
  crisis_type: string;
  severity_level: string;
  assessment: string;
  immediate_actions: ImmediateAction[];
  do_not_do: string[];
  escalation_required: boolean;
  who_to_contact: string[];
  escalation_reason: string;
  reassurance_message: string;
  timestamp: string;
}

export class MedicalAssistantAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get medical crisis assessment from AI agent
   */
  async getAssessment(request: AssessmentRequest): Promise<AssessmentResponse> {
    try {
      const response = await fetch(`${this.baseURL}/medical`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
      }

      const data: AssessmentResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Assessment API error:', error);
      throw error;
    }
  }

  /**
   * Check API health status
   */
  async checkHealth(): Promise<{ status: string; version: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const medicalAPI = new MedicalAssistantAPI();

// Helper function to normalize immediate actions from backend
export function normalizeImmediateActions(actions: any[]): ImmediateAction[] {
  if (!Array.isArray(actions)) return [];
  
  return actions.map((action, index) => ({
    step_id: action.step_id || index + 1,
    order: typeof action.step_id === 'number' ? action.step_id : (action.order || index + 1),
    action: action.instruction || action.action || action.title || '',
    is_critical: action.critical ?? action.is_critical ?? false,
    completed: action.completed || false,
    title: action.title,
    instruction: action.instruction,
    critical: action.critical,
    duration_seconds: action.duration_seconds,
  }));
}

// Helper function to format actions for display
export function formatActions(actions: ImmediateAction[]): string[] {
  return actions
    .sort((a, b) => a.order - b.order)
    .map((action) => {
      const prefix = action.is_critical ? '🚨 ' : '• ';
      return `${prefix}${action.action}`;
    });
}

// Helper function to determine if emergency services needed
export function needsEmergencyServices(response: AssessmentResponse): boolean {
  return (
    response.escalation_required ||
    response.severity_level === 'critical' ||
    response.who_to_contact.some(contact => 
      contact.toLowerCase().includes('ambulance') || 
      contact.toLowerCase().includes('911') ||
      contact.toLowerCase().includes('emergency')
    )
  );
}

// ============ Fire Emergency API Types and Service ============

export interface FireEmergencyRequest {
  user_input: string;
  steps?: number;
  emergency?: boolean;
}

export interface FireEmergencyStep {
  step_number: number;
  instruction: string;
  is_critical: boolean;
  duration_seconds?: number | null;
}

export interface FireEmergencyResponse {
  steps: FireEmergencyStep[];
  final_advice: string;
  do_not_do?: string[];
  emergency_contacts_needed?: boolean;
  error?: string;
  raw_output?: string;
}

export class FireEmergencyAPI {
  private baseURL: string;

  constructor(baseURL: string = FIRE_EMERGENCY_API_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get fire emergency guidance from AI agent
   */
  async getFireGuidance(request: FireEmergencyRequest): Promise<FireEmergencyResponse> {
    try {
      const response = await fetch(`${this.baseURL}/fire-emergency`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: request.user_input,
          steps: request.steps || 7,
          emergency: request.emergency !== false, // Default to true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
      }

      const data: FireEmergencyResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Fire Emergency API error:', error);
      throw error;
    }
  }

  /**
   * Check API health status
   */
  async checkHealth(): Promise<{ status: string; service: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const fireEmergencyAPI = new FireEmergencyAPI();
