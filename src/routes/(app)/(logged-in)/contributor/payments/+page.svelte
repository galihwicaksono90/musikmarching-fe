<script lang="ts">
  import type { PageData } from "./$types";
  import { Separator, Badge } from "$lib/components/ui";
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import { PaymentMethodForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Payment Summary</Card.Title>
    <Card.Description>Your earnings and payment history</Card.Description>
  </Card.Header>
  <Card.Content class="space-y-6">
    <div class="grid gap-4 sm:grid-cols-3">
      <Card.Root>
        <Card.Header class="pb-2">
          <Card.Title class="text-lg font-medium">Last Payment</Card.Title>
        </Card.Header>
        <Card.Content>
          {#if data.stat.latest_payment}
            <div class="text-2xl font-bold">
              {new Date(data.stat.latest_payment).toLocaleString("id-ID")}
            </div>
          {/if}
        </Card.Content>
      </Card.Root>
      <Card.Root>
        <Card.Header class="pb-2">
          <Card.Title class="text-lg font-medium">Total Paid</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="text-2xl font-bold">
            {data.stat.total_paid.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <Separator />

    <div>
      <Card.Title>Payment History</Card.Title>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Title</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Amount</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Method</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.payment as payment (payment.id)}
            <Table.Row>
              <Table.Cell class="font-medium">{payment.title}</Table.Cell>
              <Table.Cell>
                {new Date(payment.created_at).toLocaleString("id-ID")}
              </Table.Cell>
              <Table.Cell
                >{payment.revenue.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}</Table.Cell
              >
              <Table.Cell>
                {#if payment.is_verified}
                  <Badge
                    variant="outline"
                    class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Paid
                  </Badge>
                {:else}
                  <Badge
                    variant="outline"
                    class="bg-red-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    Unpaid
                  </Badge>
                {/if}
              </Table.Cell>
              <Table.Cell>{payment.payment_method}</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </Card.Content>
</Card.Root>

<Card.Root>
  <Card.Header>
    <Card.Title>Payment Settings</Card.Title>
    <Card.Description
      >Manage your payment methods and preferences</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <div class="space-y-4">
      <div>
        <h3 class="mb-2 text-sm font-medium">Current Payment Method</h3>
        <div class="rounded-md border p-4">
          <PaymentMethodForm
            data={data.form}
            paymentMethod={data.paymentMethod}
          />
          <!-- <div class="font-medium">Direct Deposit</div> -->
          <!-- <div class="text-sm text-muted-foreground"> -->
          <!--   Account ending in ****1234 -->
          <!-- </div> -->
          <!-- <Button variant="link" size="sm" class="mt-2 h-auto p-0"> -->
          <!--   <span>Update payment method</span> -->
          <!--   <ArrowUpRight class="ml-1 h-3 w-3" /> -->
          <!-- </Button> -->
        </div>
      </div>

      <!-- <div> -->
      <!--   <h3 class="mb-2 text-sm font-medium">Payment Schedule</h3> -->
      <!--   <div class="rounded-md border p-4"> -->
      <!--     <div class="font-medium">Monthly</div> -->
      <!--     <div class="text-sm text-muted-foreground"> -->
      <!--       Payments are processed on the last day of each month for balances -->
      <!--       over $20. -->
      <!--     </div> -->
      <!--   </div> -->
      <!-- </div> -->

      <!-- <div> -->
      <!--   <h3 class="mb-2 text-sm font-medium">Tax Information</h3> -->
      <!--   <div class="rounded-md border p-4"> -->
      <!--     <div class="font-medium">W-9 Form</div> -->
      <!--     <div class="text-sm text-muted-foreground"> -->
      <!--       Your tax information is complete and up to date. -->
      <!--     </div> -->
      <!--     <Button variant="link" size="sm" class="mt-2 h-auto p-0"> -->
      <!--       <span>View tax documents</span> -->
      <!--       <ArrowUpRight class="ml-1 h-3 w-3" /> -->
      <!--     </Button> -->
      <!--   </div> -->
      <!-- </div> -->
    </div>
  </Card.Content>
</Card.Root>
