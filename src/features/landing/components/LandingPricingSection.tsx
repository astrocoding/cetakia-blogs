"use client";

import { useState } from "react";
import type { LandingPricingPlan } from "@/features/landing/types/landing.type";

type BillingCycle = "annual" | "monthly";

type LandingPricingSectionProps = {
  plans: LandingPricingPlan[];
  billingCopy: {
    ariaLabel: string;
    annualLabel: string;
    annualBadge: string;
    monthlyLabel: string;
    recommendedLabel: string;
  };
};

export function LandingPricingSection({ plans, billingCopy }: LandingPricingSectionProps) {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <>
      <div
        className="mx-auto mb-6 flex w-fit items-center gap-1 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-surface-card)] p-1"
        role="group"
        aria-label={billingCopy.ariaLabel}
      >
        <button
          type="button"
          className={`lp-billing-btn${billing === "annual" ? " is-active" : ""}`}
          aria-pressed={billing === "annual"}
          onClick={() => setBilling("annual")}
        >
          {billingCopy.annualLabel} <span>{billingCopy.annualBadge}</span>
        </button>
        <button
          type="button"
          className={`lp-billing-btn${billing === "monthly" ? " is-active" : ""}`}
          aria-pressed={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          {billingCopy.monthlyLabel}
        </button>
      </div>

      <div className={`lp-pricing-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-5 lp-pricing-grid--${billing}`}>
        {plans.map((plan) => (
          <article key={plan.name} className={`lp-price-card lp-price-card--reveal${plan.recommended ? " lp-price-card--recommended" : ""}`}>
            {plan.recommended ? <span className="lp-recommend">{billingCopy.recommendedLabel}</span> : null}
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="lp-price-row">
              <strong>{billing === "annual" ? plan.annualPrice : plan.monthlyPrice}</strong>
              <span>{plan.suffix}</span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a href="#" className={`lp-btn ${plan.ctaVariant === "solid" ? "lp-btn--solid" : "lp-btn--outline"} w-full justify-center`}>
              {plan.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
