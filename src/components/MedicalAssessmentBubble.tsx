import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle, ExternalLink, Phone, PlayCircle, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MedicalAction {
  step_id?: number | string;
  title?: string;
  instruction?: string;
  critical?: boolean;
  duration_seconds?: number | null;
}

interface MedicalAssessmentProps {
  data: {
    assessment?: string;
    immediate_actions?: MedicalAction[];
    do_not_do?: string[];
    escalation?: {
      required?: boolean;
      who_to_contact?: string[];
      reason?: string;
    };
    escalation_required?: boolean;
    who_to_contact?: string[];
    escalation_reason?: string;
    reassurance_message?: string;
    crisis_type?: string;
    severity_level?: string;
    financial_resources?: string[];
  };
  index?: number;
  showRawJson?: boolean;
}

const MedicalAssessmentBubble = ({ data, index = 0, showRawJson = false }: MedicalAssessmentProps) => {
  const navigate = useNavigate();
  const [showJson, setShowJson] = useState(false);
  const escalationRequired = data.escalation_required ?? data.escalation?.required;
  const whoToContact = data.who_to_contact || data.escalation?.who_to_contact || [];
  const escalationReason = data.escalation_reason || data.escalation?.reason;

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case "critical": return "bg-red-500/10 border-red-500/50 text-red-700";
      case "high": return "bg-orange-500/10 border-orange-500/50 text-orange-700";
      case "moderate": return "bg-yellow-500/10 border-yellow-500/50 text-yellow-700";
      case "low": return "bg-green-500/10 border-green-500/50 text-green-700";
      default: return "bg-blue-500/10 border-blue-500/50 text-blue-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex justify-start"
    >
      <div className="max-w-[95%] sm:max-w-[85%] lg:max-w-[75%] rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900 shadow-lg p-4 sm:p-5 space-y-4 border border-slate-200">
        
        {/* Crisis Type & Severity Badge */}
        {(data.crisis_type || data.severity_level) && (
          <div className="flex flex-wrap items-center gap-2">
            {data.crisis_type && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-500">
                <AlertCircle className="h-3.5 w-3.5" />
                {data.crisis_type}
              </span>
            )}
            {data.severity_level && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs text-red-300 font-bold uppercase tracking-wider ${getSeverityColor(data.severity_level)}`}>
                {data.severity_level}
              </span>
            )}
          </div>
        )}

        {/* Assessment Summary - HIGHLIGHTED */}
        {data.assessment && (
          <div className="space-y-2 rounded-lg border-2 border-blue-500/50 bg-blue-50 p-4">
            <div className="flex items-center gap-2 text-base font-bold text-green-700">
              <Shield className="h-5 w-5" />
              <span>Assessment</span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-gray-800 font-medium">
              {data.assessment}
            </p>
          </div>
        )}

        {/* Immediate Actions */}
        {data.immediate_actions && data.immediate_actions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <CheckCircle className="h-4 w-4" />
              <span>Immediate Steps</span>
            </div>
            <div className="space-y-2">
              {data.immediate_actions
                .slice()
                .sort((a, b) => {
                  const aOrder = Number(a.step_id ?? 0);
                  const bOrder = Number(b.step_id ?? 0);
                  return aOrder - bOrder;
                })
                .map((action, idx) => {
                  const isCritical = action.critical;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className={`rounded-lg border p-3 ${
                        isCritical
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isCritical
                            ? "bg-red-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}>
                          {action.step_id || idx + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                          {action.title && (
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">
                                {action.title}
                              </p>
                              {isCritical && (
                                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                  Critical
                                </span>
                              )}
                            </div>
                          )}
                          {action.instruction && (
                            <p className="text-xs sm:text-sm text-gray-700">
                              {action.instruction}
                            </p>
                          )}
                          {action.duration_seconds && (
                            <p className="text-xs text-gray-600">
                              ⏱️ Duration: {action.duration_seconds}s
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Do Not Do - Warnings */}
        {data.do_not_do && data.do_not_do.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>Do NOT Do</span>
            </div>
            <div className="space-y-1.5">
              {data.do_not_do.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-yellow-400 bg-yellow-50 p-2.5 text-xs sm:text-sm text-gray-800"
                >
                  <span className="text-yellow-600">⚠️</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Escalation Alert */}
        {escalationRequired && (
          <div className="rounded-lg border-2 border-red-500 bg-red-50 p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-red-700">
              <Phone className="h-4 w-4" />
              <span>ESCALATION REQUIRED</span>
            </div>
            {whoToContact.length > 0 && (
              <p className="text-sm text-gray-800">
                <strong>Contact:</strong> {whoToContact.join(", ")}
              </p>
            )}
            {escalationReason && (
              <p className="text-xs sm:text-sm text-gray-700">
                {escalationReason}
              </p>
            )}
          </div>
        )}

        {/* Reassurance Message - HIGHLIGHTED */}
        {data.reassurance_message && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4">
            <p className="text-base sm:text-lg text-gray-800 font-medium">
              💙 {data.reassurance_message}
            </p>
          </div>
        )}

        {/* Financial Resources */}
        {data.financial_resources && data.financial_resources.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <ExternalLink className="h-4 w-4 text-green-600" />
              <span>Financial Support Resources</span>
            </div>
            <div className="space-y-2">
              {data.financial_resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.startsWith('http') ? resource : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-green-400 bg-green-50 p-3 text-sm text-gray-800 transition-colors hover:bg-green-100"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-green-600" />
                  <span className="break-all">{resource}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Guided Tutorial Button */}
        {data.immediate_actions && data.immediate_actions.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate('/tutorial/medical', { state: { medicalData: data } });
            }}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-6 py-4 text-base sm:text-lg font-bold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
          >
            <PlayCircle className="h-6 w-6" />
            Start Guided Tutorial
          </motion.button>
        )}

        {/* Raw JSON Debug (for testing) */}
        {showRawJson && (
          <div className="space-y-2">
            <button
              onClick={() => setShowJson(!showJson)}
              className="text-xs text-muted-foreground underline"
            >
              {showJson ? 'Hide' : 'Show'} Raw JSON
            </button>
            {showJson && (
              <pre className="max-h-64 overflow-auto rounded-lg bg-black/5 p-3 text-[10px] sm:text-xs font-mono">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MedicalAssessmentBubble;
