<script lang="ts">
  import type { PageData } from "./$types";
  import Crown from "lucide-svelte/icons/crown";
  import DollarSign from "lucide-svelte/icons/dollar-sign";
  import Music from "lucide-svelte/icons/music";
  import { ContributorApplyForm } from "$lib/components/form";
  import { type ContributorApply } from "$lib/model";
  import * as Card from "$lib/components/ui/card";

  let { data }: { data: PageData } = $props();
</script>

{#snippet appliedBanner(data: ContributorApply)}
  {#if !data.is_verified}
    <div class="py-2 px-4 bg-sky-500 text-white rounded-sm">
      You have applied for a contributor account. Please wait for approval.
    </div>
  {/if}
{/snippet}

<div class="flex gap-8 flex-col">
  <div>
    <div class="flex gap-2 items-center">
      <Crown class="h-8 w-8 text-amber-500" />
      <h1 class="text-3xl font-bold">Become a contributor</h1>
    </div>
    <p class="text-muted-foreground">
      Share your musical expertise with our community and earn money by selling
      your scores.
    </p>
  </div>
  {#if data.contributorApplyData}
    {@render appliedBanner(data.contributorApplyData)}
  {/if}
  <div class="flex gap-6 w-full flex-col lg:flex-row">
    <Card.Root class="flex-1 h-fit">
      <Card.Header>
        <Card.Title>Contributor Application</Card.Title>
        <Card.Description
          >Please provide information about your musical background and
          expertise.</Card.Description
        >
      </Card.Header>
      <Card.Content>
        <ContributorApplyForm
          data={data.form}
          contributorApplyData={data.contributorApplyData}
        />
      </Card.Content>
    </Card.Root>
    <div class="flex flex-col gap-6 w-full lg:w-[400px] shrink-1">
      <Card.Root>
        <Card.Header>
          <Card.Title>Why Become a Contributor?</Card.Title>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="rounded-full bg-primary/10 p-2">
              <DollarSign class="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 class="font-medium">Earn Money</h3>
              <p class="text-sm text-muted-foreground">
                Receive 70% of each sale. Payments are processed monthly for
                balances over $20.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="rounded-full bg-primary/10 p-2">
              <Music class="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 class="font-medium">Share Your Music</h3>
              <p class="text-sm text-muted-foreground">
                Reach a global audience of musicians looking for quality scores.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="rounded-full bg-primary/10 p-2">
              <Crown class="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 class="font-medium">Build Your Reputation</h3>
              <p class="text-sm text-muted-foreground">
                Establish yourself as a respected composer or arranger in our
                community.
              </p>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Application Process</Card.Title>
        </Card.Header>
        <Card.Content>
          <ol class="space-y-4">
            <li class="flex items-start gap-3">
              <div
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
              >
                1
              </div>
              <div>
                <h3 class="font-medium">Submit Application</h3>
                <p class="text-sm text-muted-foreground">
                  Complete this form with your information and sample work.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
              >
                2
              </div>
              <div>
                <h3 class="font-medium">Review Process</h3>
                <p class="text-sm text-muted-foreground">
                  Our team will review your application within 3-5 business
                  days.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
              >
                3
              </div>
              <div>
                <h3 class="font-medium">Approval & Onboarding</h3>
                <p class="text-sm text-muted-foreground">
                  If approved, you'll receive instructions to set up your
                  contributor account.
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium"
              >
                4
              </div>
              <div>
                <h3 class="font-medium">Start Publishing</h3>
                <p class="text-sm text-muted-foreground">
                  Upload your scores and start earning money from sales.
                </p>
              </div>
            </li>
          </ol>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Requirements</Card.Title>
        </Card.Header>
        <Card.Content>
          <ul
            class="list-inside list-disc space-y-2 text-sm text-muted-foreground"
          >
            <li>Demonstrated musical expertise or formal education</li>
            <li>Ability to create high-quality, error-free scores</li>
            <li>Original content or proper licensing for arrangements</li>
            <li>Commitment to quality and customer satisfaction</li>
            <li>Ability to provide both PDF scores and audio samples</li>
          </ul>
        </Card.Content>
      </Card.Root>
      <!-- <Card.Root class="shrink-1 w-[500px]"> -->
      <!--   <Card.Header> -->
      <!--     <Card.Title>Why Become a Contributor?</Card.Title> -->
      <!--   </Card.Header> -->
      <!--   <Card.Content></Card.Content> -->
      <!-- </Card.Root> -->
    </div>
  </div>
</div>
