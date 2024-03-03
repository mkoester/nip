<script lang="ts">
	export let id: number;
    export let question: string;
    export let lang: string;
</script>

<div class="card p-4 max-w-sm">
    <h3 class="h3">
        <span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">Question</span>
        <span class="text-xs font-thin">(id: {id}, lang: {lang})</span>
    </h3>
    <p class="text-center pt-3">{question}</p>
</div>
