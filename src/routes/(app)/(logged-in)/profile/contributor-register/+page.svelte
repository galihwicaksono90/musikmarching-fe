<script lang="ts">
  import type { PageData } from "./$types";
  import { ContributorApplyForm } from "$lib/components/form";

  import * as Card from "$lib/components/ui/card";
  import * as Form from "$lib/components/ui/form";
  import { Button, Separator } from "$lib/components/ui";

  let { data }: { data: PageData } = $props();

  let isSubmitted = $state(false);
</script>

<!-- <div class="max-w-xl mx-auto p-8 border rounded-xl flex flex-col gap-8"> -->
<!-- <h1 class="text-2xl font-bold">Register as Contributor</h1> -->
<!-- <ContributorRegisterForm data={data.form} /> -->
<!-- </div> -->
<div class="flex min-h-screen flex-col">
  <header class="sticky top-0 z-10 border-b bg-background">
    <div class="container flex h-16 items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-2">
        <a href="/">
          <!-- <FileMusic class="h-6 w-6" /> -->
          FileMusicicon
        </a>
        <span class="text-xl font-bold">MusicScores</span>
      </div>
    </div>
  </header>
  <main class="flex-1">
    <div class="container px-4 py-6 md:px-6 md:py-12">
      <div class="mb-8">
        <a
          href="/account"
          class="mb-4 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <!-- <ArrowLeft class="mr-2 h-4 w-4" /> -->
          Back to Account
        </a>
        <div class="flex items-center gap-3">
          <!-- <Crown class="h-8 w-8 text-amber-500" /> -->
          <h1 class="text-3xl font-bold">Become a Contributor</h1>
        </div>
        <p class="mt-2 text-muted-foreground">
          Share your musical expertise with our community and earn money by
          selling your scores.
        </p>
      </div>

      {#if isSubmitted}
        <Card.Root class="mx-auto max-w-2xl">
          <Card.Header class="text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
            >
              <!-- <CheckCircle2 -->
              <!--   class="h-8 w-8 text-green-600 dark:text-green-300" -->
              <!-- /> -->
            </div>
            <Card.Title class="text-2xl">Application Submitted!</Card.Title>
            <Card.Description>
              Thank you for applying to become a contributor on MusicScores.
              We've received your application and will review it shortly.
            </Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4 text-center">
            <p>
              Our team will review your application within 3-5 business days.
              You'll receive an email notification once we've made a decision.
            </p>
            <div class="rounded-md bg-muted p-4">
              <p class="font-medium">What happens next?</p>
              <ol
                class="mt-2 list-inside list-decimal text-sm text-muted-foreground"
              >
                <li>Our team reviews your application and sample work</li>
                <li>If approved, you'll receive an email with next steps</li>
                <li>Set up your contributor profile and payment information</li>
                <li>Start uploading and selling your music scores!</li>
              </ol>
            </div>
          </Card.Content>
          <Card.Footer class="flex justify-center">
            <Button href="/account">Return to Account</Button>
          </Card.Footer>
        </Card.Root>
      {:else}
        <div class="grid gap-8 md:grid-cols-3">
          <div class="md:col-span-2">
            <Card.Root>
              <Card.Header>
                <Card.Title>Contributor Application</Card.Title>
                <Card.Description>
                  Please provide information about your musical background and
                  expertise.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ContributorApplyForm />
                <!-- <Form {...form}> -->
                <!--   <form -->
                <!--     onSubmit={form.handleSubmit(onSubmit)} -->
                <!--     class="space-y-6" -->
                <!--   > -->
                <!--     <div class="space-y-4"> -->
                <!--       <h3 class="text-lg font-medium">Personal Information</h3> -->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="fullName" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Full Name</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Input placeholder="John Doe" {...field} /> -->
                <!--             </FormControl> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="email" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Email</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Input -->
                <!--                 type="email" -->
                <!--                 placeholder="your.email@example.com" -->
                <!--                 {...field} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormDescription> -->
                <!--               We'll use this email for all communications -->
                <!--               regarding your application. -->
                <!--             </FormDescription> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="phone" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Phone Number (Optional)</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Input -->
                <!--                 placeholder="+1 (555) 123-4567" -->
                <!--                 {...field} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!--     </div> -->
                <!---->
                <!--     <Separator /> -->
                <!---->
                <!--     <div class="space-y-4"> -->
                <!--       <h3 class="text-lg font-medium">Musical Background</h3> -->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="musicalBackground" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Musical Background</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Textarea -->
                <!--                 placeholder="Tell us about your musical background, training, and experience..." -->
                <!--                 class="min-h-32" -->
                <!--                 {...field} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="education" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Education (Optional)</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Textarea -->
                <!--                 placeholder="List any relevant degrees, certifications, or training..." -->
                <!--                 class="min-h-20" -->
                <!--                 {...field} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="experience" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel> -->
                <!--               Composition/Arrangement Experience -->
                <!--             </FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Textarea -->
                <!--                 placeholder="Describe your experience with composing, arranging, or transcribing music..." -->
                <!--                 class="min-h-32" -->
                <!--                 {...field} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="portfolioa" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Portfolio a (Optional)</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Input -->
                <!--                 placeholder="https://your-portfolio-site.com" -->
                <!--                 {...field} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormDescription> -->
                <!--               a to your website, SoundCloud, YouTube channel, or -->
                <!--               other portfolio. -->
                <!--             </FormDescription> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!--     </div> -->
                <!---->
                <!--     <Separator /> -->
                <!---->
                <!--     <div class="space-y-4"> -->
                <!--       <h3 class="text-lg font-medium"> -->
                <!--         Specialization & Content -->
                <!--       </h3> -->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="specialization" -->
                <!--         render={() => ( -->
                <!--           <FormItem> -->
                <!--             <div class="mb-4"> -->
                <!--               <FormLabel>Areas of Specialization</FormLabel> -->
                <!--               <FormDescription> -->
                <!--                 Select all musical styles or genres you -->
                <!--                 specialize in. -->
                <!--               </FormDescription> -->
                <!--             </div> -->
                <!--             <div class="grid grid-cols-2 gap-2 sm:grid-cols-3"> -->
                <!--               {specializationOptions.map((option) => ( -->
                <!--                 <FormField -->
                <!--                   key={option.id} -->
                <!--                   control={form.control} -->
                <!--                   name="specialization" -->
                <!--                   render={({ field }) => { -->
                <!--                     return ( -->
                <!--                       <FormItem -->
                <!--                         key={option.id} -->
                <!--                         class="flex flex-row items-start space-x-2 space-y-0" -->
                <!--                       > -->
                <!--                         <FormControl> -->
                <!--                           <Checkbox -->
                <!--                             checked={field.value?.includes( -->
                <!--                               option.id, -->
                <!--                             )} -->
                <!--                             onCheckedChange={(checked) => { -->
                <!--                               return checked -->
                <!--                                 ? field.onChange([ -->
                <!--                                     ...field.value, -->
                <!--                                     option.id, -->
                <!--                                   ]) -->
                <!--                                 : field.onChange( -->
                <!--                                     field.value?.filter( -->
                <!--                                       (value) => -->
                <!--                                         value !== option.id, -->
                <!--                                     ), -->
                <!--                                   ); -->
                <!--                             }} -->
                <!--                           /> -->
                <!--                         </FormControl> -->
                <!--                         <FormLabel class="font-normal"> -->
                <!--                           {option.label} -->
                <!--                         </FormLabel> -->
                <!--                       </FormItem> -->
                <!--                     ); -->
                <!--                   }} -->
                <!--                 /> -->
                <!--               ))} -->
                <!--             </div> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="primaryInstrument" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Primary Instrument</FormLabel> -->
                <!--             <Select -->
                <!--               onValueChange={field.onChange} -->
                <!--               defaultValue={field.value} -->
                <!--             > -->
                <!--               <FormControl> -->
                <!--                 <SelectTrigger> -->
                <!--                   <SelectValue placeholder="Select your primary instrument" /> -->
                <!--                 </SelectTrigger> -->
                <!--               </FormControl> -->
                <!--               <SelectContent> -->
                <!--                 <SelectItem value="piano">Piano</SelectItem> -->
                <!--                 <SelectItem value="violin">Violin</SelectItem> -->
                <!--                 <SelectItem value="guitar">Guitar</SelectItem> -->
                <!--                 <SelectItem value="voice">Voice</SelectItem> -->
                <!--                 <SelectItem value="flute">Flute</SelectItem> -->
                <!--                 <SelectItem value="clarinet"> -->
                <!--                   Clarinet -->
                <!--                 </SelectItem> -->
                <!--                 <SelectItem value="trumpet">Trumpet</SelectItem> -->
                <!--                 <SelectItem value="saxophone"> -->
                <!--                   Saxophone -->
                <!--                 </SelectItem> -->
                <!--                 <SelectItem value="cello">Cello</SelectItem> -->
                <!--                 <SelectItem value="drums"> -->
                <!--                   Drums/Percussion -->
                <!--                 </SelectItem> -->
                <!--                 <SelectItem value="other">Other</SelectItem> -->
                <!--               </SelectContent> -->
                <!--             </Select> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="contentType" -->
                <!--         render={() => ( -->
                <!--           <FormItem> -->
                <!--             <div class="mb-4"> -->
                <!--               <FormLabel>Content Types</FormLabel> -->
                <!--               <FormDescription> -->
                <!--                 What type of content do you plan to contribute? -->
                <!--               </FormDescription> -->
                <!--             </div> -->
                <!--             <div class="grid grid-cols-1 gap-2 sm:grid-cols-2"> -->
                <!--               {contentTypeOptions.map((option) => ( -->
                <!--                 <FormField -->
                <!--                   key={option.id} -->
                <!--                   control={form.control} -->
                <!--                   name="contentType" -->
                <!--                   render={({ field }) => { -->
                <!--                     return ( -->
                <!--                       <FormItem -->
                <!--                         key={option.id} -->
                <!--                         class="flex flex-row items-start space-x-2 space-y-0" -->
                <!--                       > -->
                <!--                         <FormControl> -->
                <!--                           <Checkbox -->
                <!--                             checked={field.value?.includes( -->
                <!--                               option.id, -->
                <!--                             )} -->
                <!--                             onCheckedChange={(checked) => { -->
                <!--                               return checked -->
                <!--                                 ? field.onChange([ -->
                <!--                                     ...field.value, -->
                <!--                                     option.id, -->
                <!--                                   ]) -->
                <!--                                 : field.onChange( -->
                <!--                                     field.value?.filter( -->
                <!--                                       (value) => -->
                <!--                                         value !== option.id, -->
                <!--                                     ), -->
                <!--                                   ); -->
                <!--                             }} -->
                <!--                           /> -->
                <!--                         </FormControl> -->
                <!--                         <FormLabel class="font-normal"> -->
                <!--                           {option.label} -->
                <!--                         </FormLabel> -->
                <!--                       </FormItem> -->
                <!--                     ); -->
                <!--                   }} -->
                <!--                 /> -->
                <!--               ))} -->
                <!--             </div> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!---->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="publishingFrequency" -->
                <!--         render={({ field }) => ( -->
                <!--           <FormItem class="space-y-3"> -->
                <!--             <FormLabel>Expected Publishing Frequency</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <RadioGroup -->
                <!--                 onValueChange={field.onChange} -->
                <!--                 defaultValue={field.value} -->
                <!--                 class="flex flex-col space-y-1" -->
                <!--               > -->
                <!--                 <FormItem class="flex items-center space-x-3 space-y-0"> -->
                <!--                   <FormControl> -->
                <!--                     <RadioGroupItem value="weekly" /> -->
                <!--                   </FormControl> -->
                <!--                   <FormLabel class="font-normal"> -->
                <!--                     Weekly (1+ scores per week) -->
                <!--                   </FormLabel> -->
                <!--                 </FormItem> -->
                <!--                 <FormItem class="flex items-center space-x-3 space-y-0"> -->
                <!--                   <FormControl> -->
                <!--                     <RadioGroupItem value="monthly" /> -->
                <!--                   </FormControl> -->
                <!--                   <FormLabel class="font-normal"> -->
                <!--                     Monthly (1-4 scores per month) -->
                <!--                   </FormLabel> -->
                <!--                 </FormItem> -->
                <!--                 <FormItem class="flex items-center space-x-3 space-y-0"> -->
                <!--                   <FormControl> -->
                <!--                     <RadioGroupItem value="quarterly" /> -->
                <!--                   </FormControl> -->
                <!--                   <FormLabel class="font-normal"> -->
                <!--                     Quarterly (1-3 scores per quarter) -->
                <!--                   </FormLabel> -->
                <!--                 </FormItem> -->
                <!--                 <FormItem class="flex items-center space-x-3 space-y-0"> -->
                <!--                   <FormControl> -->
                <!--                     <RadioGroupItem value="occasionally" /> -->
                <!--                   </FormControl> -->
                <!--                   <FormLabel class="font-normal"> -->
                <!--                     Occasionally (no regular schedule) -->
                <!--                   </FormLabel> -->
                <!--                 </FormItem> -->
                <!--               </RadioGroup> -->
                <!--             </FormControl> -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!--     </div> -->
                <!---->
                <!--     <Separator /> -->
                <!---->
                <!--     <div class="space-y-4"> -->
                <!--       <h3 class="text-lg font-medium">Sample Work</h3> -->
                <!--       <FormField -->
                <!--         control={form.control} -->
                <!--         name="sampleFile" -->
                <!--         render={({ -->
                <!--           field: { value, onChange, ...fieldProps }, -->
                <!--         }) => ( -->
                <!--           <FormItem> -->
                <!--             <FormLabel>Upload Sample Score (PDF)</FormLabel> -->
                <!--             <FormControl> -->
                <!--               <Input -->
                <!--                 type="file" -->
                <!--                 accept=".pdf" -->
                <!--                 onChange={(e) => { -->
                <!--                   const file = e.target.files?.[0]; -->
                <!--                   onChange(file); -->
                <!--                 }} -->
                <!--                 {...fieldProps} -->
                <!--               /> -->
                <!--             </FormControl> -->
                <!--             <FormDescription> -->
                <!--               Please upload a sample of your work to help us -->
                <!--               evaluate your application. -->
                <!--             </FormDescription> -->
                <!--             {value && ( -->
                <!--               <div class="text-sm text-muted-foreground"> -->
                <!--                 {value.name} ({Math.round(value.size / 1024)}{" "} -->
                <!--                 KB) -->
                <!--               </div> -->
                <!--             )} -->
                <!--             <FormMessage /> -->
                <!--           </FormItem> -->
                <!--         )} -->
                <!--       /> -->
                <!--     </div> -->
                <!---->
                <!--     <Separator /> -->
                <!---->
                <!--     <Form.Field -->
                <!--       control={form.control} -->
                <!--       name="termsAgreed" -->
                <!--       render={({ field }) => ( -->
                <!--         <FormItem class="flex flex-row items-start space-x-3 space-y-0"> -->
                <!--           <FormControl> -->
                <!--             <Checkbox -->
                <!--               checked={field.value} -->
                <!--               onCheckedChange={field.onChange} -->
                <!--             /> -->
                <!--           </FormControl> -->
                <!--           <div class="space-y-1 leading-none"> -->
                <!--             <FormLabel> -->
                <!--               I agree to the{" "} -->
                <!--               <a href="#" class="text-primary underline"> -->
                <!--                 Terms and Conditions -->
                <!--               </a>{" "} -->
                <!--               and{" "} -->
                <!--               <a href="#" class="text-primary underline"> -->
                <!--                 Contributor Guidelines -->
                <!--               </a> -->
                <!--             </FormLabel> -->
                <!--             <FormDescription> -->
                <!--               By submitting this application, you agree to our -->
                <!--               contributor terms and copyright policies. -->
                <!--             </FormDescription> -->
                <!--             <FormMessage /> -->
                <!--           </div> -->
                <!--         </FormItem> -->
                <!--       )} -->
                <!--     /> -->
                <!---->
                <!--     {form.formState.errors.root && ( -->
                <!--       <div class="rounded-md bg-destructive/15 p-3 text-destructive"> -->
                <!--         {form.formState.errors.root.message} -->
                <!--       </div> -->
                <!--     )} -->
                <!---->
                <!--     <div class="flex justify-end gap-4"> -->
                <!--       <Button variant="outline" href="/account">Cancel</Button> -->
                <!--       <Button type="submit" disabled={isSubmitting}> -->
                <!--         {isSubmitting ? ( -->
                <!--           <> -->
                <!--             <span class="mr-2">Submitting...</span> -->
                <!--             <Upload class="h-4 w-4 animate-pulse" /> -->
                <!--           </> -->
                <!--         ) : ( -->
                <!--           "Submit Application" -->
                <!--         )} -->
                <!--       </Button> -->
                <!--     </div> -->
                <!--   </form> -->
                <!-- </Form> -->
              </Card.Content>
            </Card.Root>
          </div>

          <div>
            <div class="space-y-6">
              <Card.Root>
                <Card.Header>
                  <Card.Title>Why Become a Contributor?</Card.Title>
                </Card.Header>
                <Card.Content class="space-y-4">
                  <div class="flex items-start gap-3">
                    <div class="rounded-full bg-primary/10 p-2">
                      <!-- <DollarSign class="h-4 w-4 text-primary" /> -->
                    </div>
                    <div>
                      <h3 class="font-medium">Earn Money</h3>
                      <p class="text-sm text-muted-foreground">
                        Receive 70% of each sale. Payments are processed monthly
                        for balances over $20.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="rounded-full bg-primary/10 p-2">
                      <!-- <Music class="h-4 w-4 text-primary" /> -->
                    </div>
                    <div>
                      <h3 class="font-medium">Share Your Music</h3>
                      <p class="text-sm text-muted-foreground">
                        Reach a global audience of musicians looking for quality
                        scores.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="rounded-full bg-primary/10 p-2">
                      <!-- <Crown class="h-4 w-4 text-primary" /> -->
                    </div>
                    <div>
                      <h3 class="font-medium">Build Your Reputation</h3>
                      <p class="text-sm text-muted-foreground">
                        Establish yourself as a respected composer or arranger
                        in our community.
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
                          Complete this form with your information and sample
                          work.
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
                          Our team will review your application within 3-5
                          business days.
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
                          If approved, you'll receive instructions to set up
                          your contributor account.
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
                    <li>
                      Original content or proper licensing for arrangements
                    </li>
                    <li>Commitment to quality and customer satisfaction</li>
                    <li>
                      Ability to provide both PDF scores and audio samples
                    </li>
                  </ul>
                </Card.Content>
              </Card.Root>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>
