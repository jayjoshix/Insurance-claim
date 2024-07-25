<script>
    export let policy
</script>


<div
	class="mt-10 pt-10 w-full max-w-4xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
	<div class="flex items-center justify-between mb-4">
		<div class="space-y-1">
			<h2 class="text-xl font-semibold">List of policies</h2>
			<p class="text-sm text-gray-500">
				Fetched {policy.length} policies
			</p>
		</div>
	</div>
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-400">
		  <tr>
			<th
			  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
			  >Id</th
			>
			<th
			  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
			  >provider</th
			>
			<th
			  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
			  >coverage</th
			>
			<th
			  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
			  >Details</th
			>
		  </tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
		{#each policy as policy (policy.policy_id)}
			<tr>
			    <td class="font-medium pt-1 leading-none">{policy.policy_id}</td>
			    <td class="font-medium pl-5 text-gray-500 pt-0">{policy.provider}</td>  
			    <td class="font-medium pl-5 text-gray-500 pt-0">{policy.coverage}</td>      

				<td class="px-6 py-4 whitespace-nowrap">
					<form method="GET" action="/dashboard/claims" class="inline-block">
						<input type="hidden" name="id" value={policy.policy_id} />
						<button
						  class=" bg-orange-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-xl"
						  type="submit"
						>
						  View Details
						</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
</div>